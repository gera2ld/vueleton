<template>
  <div
    class="vl-tooltip"
    :class="`vl-tooltip-${placement} vl-tooltip-align-${align}`"
  >
    <i></i>
    <div class="vl-tooltip-wrap">
      <div class="vl-tooltip-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placement: {
      type: String,
      default: 'auto-y',
    },
    align: {
      type: String,
      default: 'center', // start | center | end
    },
  },
};
</script>

<style src="./style.css"></style>
