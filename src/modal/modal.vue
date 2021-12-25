<template>
  <teleport to="body">
    <transition :name="transition" @after-leave="onAfterLeave" appear>
      <div :class="`vl-modal ${modalClass}`" v-if="show">
        <div
          :class="`vl-modal-backdrop ${backdropClass}`"
          v-if="backdrop"
          @click="onBackdropClick"
        />
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'vl-modal',
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
    show: {
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

<style src="./style.css"></style>
