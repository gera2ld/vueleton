<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
/**
 * This is a simple polyfill for porting Vue 3 built-in component teleport to Vue 2.
 */
import { lifecycleBeforeUnmount } from './util';

export default {
  props: ['to'],
  mounted() {
    const target = document.querySelector(this.to);
    if (target) {
      target.append(this.$el);
    }
  },
  [lifecycleBeforeUnmount]() {
    this.$el.remove();
  },
};
</script>
