import type { App, PluginInstallFunction } from 'vue'

interface options {
  a?: string
}

declare const install: (app: App, options: options) => void

declare const version = '0.1.0'

export {
  install,
  version
}

declare const _default: {
  version: string;
  // install: (app: App<any>, options: options) => void;
  install: PluginInstallFunction;
};

export default _default


