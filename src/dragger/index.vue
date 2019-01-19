<template>
  <div @mousedown="onMouseDown" @touchstart="onTouchStart">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    tickTime: {
      default: 200,
    },
  },
  data() {
    return {
      dragging: null,
    };
  },
  methods: {
    onMouseDown(e) {
      if (this.dragging) return;
      document.addEventListener('mousemove', this.onMouseMove, false);
      document.addEventListener('mouseup', this.onMouseUp, false);
      this.handleDrag(e);
    },
    onMouseMove(e) {
      this.handleUpdate(e);
    },
    onMouseUp() {
      document.removeEventListener('mousemove', this.onMouseMove, false);
      document.removeEventListener('mouseup', this.onMouseUp, false);
      this.handleClean();
    },
    onTouchStart(e) {
      if (this.dragging) return;
      const touch = e.changedTouches[0];
      if (!touch) return;
      e.preventDefault();
      document.addEventListener('touchmove', this.onTouchMove, false);
      document.addEventListener('touchend', this.onTouchEnd, false);
      this.handleDrag(touch, {
        id: touch.identifier,
      });
    },
    findTouch(e) {
      return Array.from(e.changedTouches)
      .find(({ identifier }) => identifier === this.dragging.id);
    },
    onTouchMove(e) {
      const touch = this.findTouch(e);
      if (touch) this.handleUpdate(touch);
    },
    onTouchEnd(e) {
      const touch = this.findTouch(e);
      if (touch) {
        document.removeEventListener('touchmove', this.onTouchMove, false);
        document.removeEventListener('touchend', this.onTouchEnd, false);
        this.handleClean();
      }
    },
    async handleDrag(e, extra) {
      const dragging = {
        ...extra,
        x: e.clientX,
        y: e.clientY,
      };
      this.dragging = dragging;
      while (true) { // eslint-disable-line no-constant-condition
        await new Promise(resolve => setTimeout(resolve, this.tickTime));
        if (dragging !== this.dragging) break;
        await this.$emit('tick', dragging);
      }
    },
    handleUpdate(e) {
      const { dragging } = this;
      const { x, y } = dragging;
      dragging.dx = e.clientX - x;
      dragging.dy = e.clientY - y;
      this.$emit('update', dragging);
    },
    handleClean() {
      this.$emit('end', this.dragging);
      this.dragging = null;
    },
  },
};
</script>
