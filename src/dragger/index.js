import VlDragger from './dragger.vue';

function install(Vue) {
  Vue.component('vl-dragger', VlDragger);
}

VlDragger.install = install;

export default VlDragger;
