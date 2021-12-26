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
const components = {
/* vue@2
  teleport: () => import('../teleport.vue'),
 */
};

export default {
  name: 'vl-modal',
  components,
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
  emits: ['close', 'afterLeave'],
  methods: {
    onBackdropClick() {
      if (this.backdrop === true || this.backdrop.close) {
        this.$emit('close', {
          source: 'backdrop',
        });
      }
    },
    onAfterLeave() {
      this.$emit('afterLeave');
    },
  },
};
</script>

<style src="./style.css"></style>
