<template>
  <div>
    <transition :name="transition" @after-leave="onAfterLeave" appear>
      <div :class="`vl-modal ${modalClass}`" v-if="visible">
        <div
          :class="`vl-modal-backdrop ${backdropClass}`"
          v-if="backdrop"
          @click="onBackdropClick"
        />
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    modalClass: {
      type: String,
      default: '',
    },
    backdropClass: {
      type: String,
      default: '',
    },
    transition: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    backdrop: {
      type: [Object, Boolean],
      default: () => ({ close: true }),
    },
  },
  methods: {
    onBackdropClick() {
      if (this.backdrop === true || this.backdrop.close) {
        this.$emit('close', {
          source: 'backdrop',
        });
      }
    },
    onAfterLeave() {
      this.$emit('after-leave');
    },
  },
};
</script>

<style>
.vl-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  text-align: center;
  &-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.4);
    z-index: -1;
  }
}
</style>
