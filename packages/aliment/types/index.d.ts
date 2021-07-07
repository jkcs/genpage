import type { App, PluginInstallFunction } from 'vue'

declare const install: (app: App, options: options) => void

declare const version = '0.1.0'

export {
  install,
  version
}

declare const _default: {
  version: string;
  install: PluginInstallFunction;
};

export default _default


