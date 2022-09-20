import { createApp, h, reactive } from 'vue';
import VlModal from './modal.vue';

function showModal(childComponent, props) {
  const data = reactive({
    ...props,
    show: true,
    onAfterLeave: () => {
      app.unmount();
      container.remove();
    },
  });
  const close = () => {
    data.show = false;
  };
  data.onClose = close;
  const app = createApp({
    render: () => h(VlModal, data, () => [h(childComponent)]),
  });
  const container = document.createElement('div');
  document.body.append(container);
  app.mount(container);
  return { close };
}

VlModal.show = showModal;
