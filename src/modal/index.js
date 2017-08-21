import Vue from 'vue';
import VlModal from './index.vue';

export default VlModal;

VlModal.show = (message, props) => {
  const data = {
    props: Object.assign({}, props, { visible: true }),
    on: {
      close,
      'after-leave': destroy,
    },
  };
  let vm = new Vue({
    data: data.props,
    render: h => {
      const child = typeof message === 'function' ? message(h) : message;
      return h('div', [
        h(VlModal, data, [child]),
      ]);
    },
  });
  const el = document.createElement('div');
  document.body.appendChild(el);
  vm.$mount(el);
  return { close };

  function close() {
    data.props.visible = false;
  }
  function destroy() {
    if (vm) {
      const { $el } = vm;
      $el.parentNode.removeChild($el);
      vm.$destroy();
      vm = null;
    }
  }
};
