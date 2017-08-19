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
    render: h => h('div', [
      h(VlModal, data, [message]),
    ]),
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
