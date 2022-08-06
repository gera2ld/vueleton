<template>
  <section>
    <h1>Modal</h1>
    <button @click="onShow">Show modal</button>
    <vl-modal transition="fade" :show="show" @close="onClose">
      <div class="demo-modal-body">
        <h1>Hello, world!</h1>
        <button @click="onClose">Close</button>
      </div>
    </vl-modal>
  </section>
</template>

<script>
import VlModal from 'vueleton/lib/modal';
import doc from '~/components/modal/doc.md';
import Message from '~/components/modal/message';
import store from '~/assets/store';

export default {
  components: {
    VlModal,
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    store.doc = doc;
  },
  methods: {
    onShow() {
      this.show = true;
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
  &-appear,
  &-enter,
  &-leave-active {
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
  &-appear,
  &-enter,
  &-leave-active {
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
