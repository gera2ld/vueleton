import VlDropdown from './dropdown.vue';

function install(Vue) {
  Vue.component('vl-dropdown', VlDropdown);
}

VlDropdown.install = install;

export default VlDropdown;
