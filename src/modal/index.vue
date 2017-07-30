<template>
  <div class="vl-modal" v-if="visible">
    <div class="vl-modal-backdrop" v-if="backdrop" @click="onBackdropClick"></div>
    <div class="vl-modal-content"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    backdrop: {
      type: Boolean,
      default: true,
    },
    backdropClose: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onBackdropClick(e) {
      if (this.backdropClose) {
        e.stopPropagation();
        this.$emit('close', {
          source: 'backdrop',
        });
      }
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
