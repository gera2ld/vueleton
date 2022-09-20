import Vue from 'vue';
import VlModal from './modal.vue';

export function showModal(childComponent, props) {
  const data = {
    ...props,
    show: true,
  };
  const close = () => {
    data.show = false;
  };
  const destroy = () => {
    if (vm) {
      vm.$destroy();
      vm = null;
    }
  };
  const on = {
    close,
    afterLeave: destroy,
  };
  let vm = new Vue({
    data,
    render: (h) =>
      h(VlModal, { props: data, on }, [h(childComponent, { props })]),
  }).$mount();
  return { close };
}

VlModal.show = showModal;
