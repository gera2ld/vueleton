import VlCode from './code.vue';

function install(Vue) {
  Vue.component('vl-code', VlCode);
}

VlCode.install = install;

export default VlCode;
