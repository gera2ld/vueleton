<template>
  <div class="vl-modal" v-if="visible">
    <div class="vl-modal-backdrop" v-if="backdrop" @click="onBackdropClick"></div>
    <div class="vl-modal-body">
      <slot></slot>
    </div>
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
  &-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.4);
  }
  &-body {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
