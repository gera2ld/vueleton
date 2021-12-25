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
    <div class="vl-dropdown-menu" v-show="active" @mousedown.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vl-dropdown',
  props: {
    // If true, the dropdown menu will close on menu clicked.
    closeAfterClick: {
      type: Boolean,
      default: false,
    },
    // If true, the dropdown menu will always open on toggle clicked.
    toggleOnOnly: {
      type: Boolean,
      default: false,
    },
    // If true, the dropdown menu will open on toggle focused.
    focusOpen: {
      type: Boolean,
      default: false,
    },
    // Set alignment of the dropdown menu, either 'left' or 'right'.
    align: {
      type: String,
      default: 'left',
    },
    // Set direction of the dropdown menu, either 'down' or 'up'.
    direction: {
      type: String,
      default: 'down',
    },
  },
  data() {
    return {
      active: false,
    };
  },
  watch: {
    active(active, formerActive) {
      if (active === formerActive) return;
      if (active) {
        document.addEventListener('mousedown', this.onClose, false);
      } else {
        document.removeEventListener('mousedown', this.onClose, false);
      }
      this.$emit('stateChange', active);
    },
  },
  methods: {
    onToggle() {
      this.active = !this.active;
    },
    onOpen() {
      this.active = true;
    },
    onClose() {
      this.active = false;
    },
    onFocus() {
      if (this.focusOpen) this.onOpen();
    },
    onBlur() {
      const { activeElement } = document;
      if (activeElement !== document.body && !this.$el.contains(activeElement))
        this.onClose();
    },
    onMouseUp() {
      if (this.closeAfterClick) this.onClose();
    },
  },
};
</script>

<style src="./style.css"></style>
