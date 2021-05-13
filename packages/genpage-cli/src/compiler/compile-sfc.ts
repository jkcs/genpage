// TODO fix it
// import * as compiler from 'vue-template-compiler';

import * as compileUtils from '@vue/component-compiler-utils';
import hash from 'hash-sum';
import { parse, join, dirname, resolve } from 'path';
import { remove, writeFileSync, readFileSync } from 'fs-extra';
import { replaceExt } from '../common';
import { compileJs } from './compile-js';
import { compileStyle } from './compile-style';
import { ROOT } from '../common/constant'
const Module = require('module')
const createRequire = Module.createRequire || Module.createRequireFromPath || function (filename: string) {
  const mod = new Module(filename, null)
  mod.filename = filename
  mod.paths = Module._nodeModulePaths(dirname(filename))

  mod._compile(`module.exports = require;`, filename)

  return mod.exports
}

// const compiler = require(join(ROOT, './node_modules/vue-template-compiler'))
const compiler = createRequire(resolve(ROOT, 'package.json'))('vue-template-compiler')
const RENDER_FN = '__vue_render__';
const STATIC_RENDER_FN = '__vue_staticRenderFns__';
const EXPORT = 'export default {';

// trim some unused code
function trim(code: string) {
  return code.replace(/\/\/\n/g, '').trim();
}

function getSfcStylePath(filePath: string, ext: string, index: number) {
  const number = index !== 0 ? `-${index + 1}` : '';
  return replaceExt(filePath, `-sfc${number}.${ext}`);
}

// inject render fn to script
function injectRender(script: string, render: string) {
  script = trim(script);

  render = render
    .replace('var render', `var ${RENDER_FN}`)
    .replace('var staticRenderFns', `var ${STATIC_RENDER_FN}`);

  return script.replace(
    EXPORT,
    `${render}\n${EXPORT}\n  render: ${RENDER_FN},\n\n  staticRenderFns: ${STATIC_RENDER_FN},\n`
  );
}

function injectScopeId(script: string, scopeId: string) {
  return script.replace(EXPORT, `${EXPORT}\n  _scopeId: '${scopeId}',\n\n`);
}

function injectStyle(
  script: string,
  styles: compileUtils.SFCBlock[],
  filePath: string
) {
  if (styles.length) {
    const imports = styles
      .map((style, index) => {
        const { base } = parse(getSfcStylePath(filePath, 'css', index));
        return `import './${base}';`;
      })
      .join('\n');

    return script.replace(EXPORT, `${imports}\n\n${EXPORT}`);
  }

  return script;
}

function compileTemplate(template: string) {
  const result = compileUtils.compileTemplate({
    compiler,
    source: template,
    isProduction: true,
  } as any);

  return result.code;
}

export function parseSfc(filePath: string) {
  const source = readFileSync(filePath, 'utf-8');

  const descriptor = compileUtils.parse({
    source,
    compiler,
    needMap: false,
  } as any);

  return descriptor;
}

export async function compileSfc(filePath: string): Promise<any> {
  const tasks = [remove(filePath)];
  const source = readFileSync(filePath, 'utf-8');
  const jsFilePath = replaceExt(filePath, '.js');
  const descriptor = parseSfc(filePath);
  const { template, styles } = descriptor;

  const hasScoped = styles.some(s => s.scoped);
  const scopeId = hasScoped ? `data-v-${hash(source)}` : '';

  // compile js part
  if (descriptor.script) {
    tasks.push(
      new Promise((resolve, reject) => {
        let script = descriptor.script!.content;
        script = injectStyle(script, styles, filePath);

        if (template) {
          const render = compileTemplate(template.content);
          script = injectRender(script, render);
        }

        if (scopeId) {
          script = injectScopeId(script, scopeId);
        }

        writeFileSync(jsFilePath, script);
        compileJs(jsFilePath)
          .then(resolve)
          .catch(reject);
      })
    );
  }

  // compile style part
  tasks.push(
    ...styles.map((style, index: number) => {
      const cssFilePath = getSfcStylePath(filePath, style.lang || 'css', index);

      let styleSource = trim(style.content);

      if (style.scoped) {
        styleSource = compileUtils.compileStyle({
          id: scopeId,
          scoped: true,
          source: styleSource,
          filename: cssFilePath,
          preprocessLang: style.lang,
        }).code;
      }

      writeFileSync(cssFilePath, styleSource);

      return compileStyle(cssFilePath);
    })
  );

  return Promise.all(tasks);
}
