import Router from 'D:/awork/workspace-tmp/genpage/packages/genpage-aliment/src/router';

const version = '2.11.1';

function install(Vue) {
  const components = [
    Router
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
  Router
};

export default {
  install,
  version
};
