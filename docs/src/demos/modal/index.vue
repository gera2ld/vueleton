<template>
  <section>
    <h3>Demo</h3>
    <button @click="onShow">Show modal</button>
    <button @click="onShowMessage">Show message</button>
    <modal :visible="visible" @close="onClose">
      <div class="demo-modal-body">
        <h1>Hello, world!</h1>
        <button @click="onClose">Close</button>
      </div>
    </modal>
  </section>
</template>

<script>
import { Modal } from 'vueleton';
import doc from './doc.md';
import Message from './message';

export default {
  meta: {
    doc,
  },
  components: {
    Modal,
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onShow() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onShowMessage() {
      Modal.show(this.$createElement(Message), {
        transition: 'in-out',
      });
    },
  },
};
</script>

<style>
.demo-modal-body {
  width: 200px;
  margin-top: 100px;
  padding: 30px;
  background: white;
}
.in-out {
  &-appear,
  &-enter,
  &-leave-active {
    .vl-modal-content {
      transform: translateY(-150%);
    }
  }
  &-appear-active,
  &-enter-active,
  &-leave-active {
    &,
    .vl-modal-content {
      transition: transform .5s;
    }
  }
}
</style>
