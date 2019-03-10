import VlTooltip from './tooltip.vue';

function install(Vue) {
  Vue.component('vl-tooltip', VlTooltip);
}

VlTooltip.install = install;

export default VlTooltip;
