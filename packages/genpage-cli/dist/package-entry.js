import Lazyload from 'D:/awork/workspace-tmp/genpage/packages/genpage-aliment/src/lazyload';

const version = '2.11.1';

function install(Vue) {
  const components = [
    
  ];

  components.forEach(item => {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  version,
  Lazyload
};

export default {
  install,
  version
};
