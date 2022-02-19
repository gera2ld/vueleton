<template>
  <div
    class="vl-dropdown"
    :class="`vl-dropdown-${align} vl-dropdown-${direction}`"
    @mouseup="onMouseUp"
  >
    <div
      class="vl-dropdown-toggle"
      @click="onToggle"
      @focus="onFocus"
      @blur="onBlur"
    >
      <slot name="toggle"></slot>
    </div>
    <div class="vl-dropdown-menu" v-show="open" @mousedown.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { modelFields } from '../util';

export default {
  name: 'vl-dropdown',
  props: {
    /**
     * If true, the dropdown menu will close on menu clicked.
     */
    closeAfterClick: {
      type: Boolean,
      default: false,
    },
    /**
     * If true, the dropdown menu will open on toggle focused.
     */
    focusOpen: {
      type: Boolean,
      default: false,
    },
    /**
     * Set alignment of the dropdown menu, either 'left' or 'right'.
     */
    align: {
      type: String,
      default: 'left',
    },
    /**
     * Set direction of the dropdown menu, either 'down' or 'up'.
     */
    direction: {
      type: String,
      default: 'down',
    },
    /**
     * Whether to show dropdown.
     */
    [modelFields.value]: {
      type: Boolean,
      default: false,
    },
  },
  emits: [modelFields.update],
  data() {
    return {
      open: this.modelValue,
    };
  },
  watch: {
    [modelFields.value](value) {
      this.open = value;
    },
    open(value, prevValue) {
      if (value === prevValue) return;
      if (value) {
        document.addEventListener('mousedown', this.onClose, false);
      } else {
        document.removeEventListener('mousedown', this.onClose, false);
      }
    },
  },
  methods: {
    onToggle() {
      this.open = !this.open;
      this.$emit(modelFields.update, this.open);
    },
    onClose() {
      if (this.open) this.onToggle();
    },
    onFocus() {
      if (this.focusOpen && !this.open) this.onToggle();
    },
    onBlur() {
      const { activeElement } = document;
      if (
        activeElement !== document.body &&
        !this.$el.contains(activeElement)
      ) {
        this.onClose();
      }
    },
    onMouseUp() {
      if (this.closeAfterClick) this.onClose();
    },
  },
};
</script>

<style src="./style.css"></style>
