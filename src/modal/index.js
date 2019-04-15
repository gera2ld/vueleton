import VlModal from './modal.vue';

function install(Vue) {
  Vue.prototype.$modal = showModal;
  Vue.component('vl-modal', VlModal);

  function showModal(message, props) {
    const data = {
      ...props,
      visible: true,
    };
    const on = {
      close,
      'after-leave': destroy,
    };
    let vm = new Vue({
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
}

VlModal.install = install;

export default VlModal;
