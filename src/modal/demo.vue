<template>
  <section>
    <h3>Demo</h3>
    <button @click="onShow">Show modal</button>
    <modal :visible="visible" @close="onClose">
      <div class="demo-modal-body">
        <h1>Hello, world!</h1>
        <button @click="onClose">Close</button>
      </div>
    </modal>
  </section>
</template>

<script>
import Modal from '.';
import doc from './doc.md';

export default {
  meta: {
    name: 'Modal',
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
</style>
