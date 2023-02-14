<template>
  <section>
    <h1>Modal</h1>
    <button @click="onShow">Show modal</button>
    <button @click="onShowAPI">Call modal API</button>
    <vl-modal transition="fade" :show="show" @close="onClose">
      <div class="demo-modal-body">
        <h1>Predefined Modal</h1>
        <button @click="onClose">Close</button>
      </div>
    </vl-modal>
    <MarkdownDoc :html="doc" />
  </section>
</template>

<script>
import VlModal from 'vueleton/lib/modal';
import MarkdownDoc from '~/components/markdown-doc.vue';
import doc from '~/components/modal/doc.md.js';
import Message from '~/components/modal/message';

export default {
  components: {
    MarkdownDoc,
    VlModal,
  },
  data() {
    return {
      doc,
      show: false,
    };
  },
  methods: {
    onShow() {
      this.show = true;
    },
    onShowAPI() {
      VlModal.show(Message, {
        transition: 'in-out',
      });
    },
    onClose() {
      this.show = false;
    },
  },
};
</script>

<style>
.demo-modal-body {
  width: 200px;
  margin: 100px auto 0;
  padding: 30px;
  background: white;
}

.in-out {
  &-appear-from,
  &-enter-from,
  &-leave-to {
    > .demo-modal-message {
      transform: translateY(-120%);
    }
  }
  &-appear-active,
  &-enter-active,
  &-leave-active {
    &,
    > * {
      transition: transform .5s;
    }
  }
}

.fade {
  &-appear-from,
  &-enter-from,
  &-leave-to {
    > * {
      opacity: 0;
    }
  }
  &-appear-active,
  &-enter-active,
  &-leave-active {
    &,
    > * {
      transition: opacity .5s;
    }
  }
}
</style>
