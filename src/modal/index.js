import Vue from 'vue';
import VlModal from './modal.vue';

function showModal(message, props) {
  const data = {
    ...props,
    visible: true,
  };
  const on = {
    close,
    'after-leave': destroy,
  };
  let vm = new VlModal.Vue({
    data,
    render: (h) => {
      const child = typeof message === 'function' ? message(h) : message;
      return h(VlModal, {
        props: data,
        on,
      }, [child]);
    },
  })
  .$mount();
  document.body.appendChild(vm.$el);
  return { close };

  function close() {
    data.visible = false;
  }
  function destroy() {
    if (vm) {
      const { $el } = vm;
      $el.parentNode.removeChild($el);
      vm.$destroy();
      vm = null;
    }
  }
}

VlModal.Vue = Vue;
VlModal.install = ($Vue) => {
  VlModal.Vue = $Vue;
  $Vue.prototype.$modal = showModal;
  $Vue.component('vl-modal', VlModal);
};

VlModal.show = showModal;

export default VlModal;
