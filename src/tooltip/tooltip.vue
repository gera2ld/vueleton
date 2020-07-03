<template>
  <span :class="{ disabled }" @mouseenter="onEnter" @mouseleave="onLeave">
    <slot></slot>
  </span>
</template>

<script>
import Vue from 'vue';
import TooltipContent from './tooltip-content.vue';

const tooltips = [];
const throttledUpdate = throttleWithRAF(updateTooltips);
document.addEventListener('scroll', throttledUpdate, true);
window.addEventListener('resize', throttledUpdate, false);

function throttleWithRAF(func) {
  let running = false;
  function exec() {
    func();
    running = false;
  }
  return () => {
    if (running) return;
    requestAnimationFrame(exec);
    running = true;
  };
}

function updateTooltips() {
  tooltips.forEach((tooltip) => {
    tooltip.render();
  });
}
function addTooltip(tooltip) {
  tooltips.push(tooltip);
}
function removeTooltip(tooltip) {
  tooltip.clean();
  const i = tooltips.indexOf(tooltip);
  if (i >= 0) tooltips.splice(i, 1);
}

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    noMouse: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'auto-y',
    },
    align: {
      type: String,
      default: 'center', // start | center | end
    },
    content: {
      type: String,
    },
    gap: {
      type: Number,
      default: 10,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hovered: false,
    };
  },
  computed: {
    shouldHandleMouse() {
      return !this.disabled && !this.noMouse;
    },
    shouldShow() {
      return !this.disabled && (this.active || this.hovered);
    },
  },
  watch: {
    shouldShow: 'render',
    placement: 'render',
    align: 'render',
    content: 'render',
    gap: 'render',
  },
  methods: {
    onEnter() {
      if (this.shouldHandleMouse) this.hovered = true;
    },
    onLeave() {
      this.hovered = false;
    },
    render() {
      if (this.shouldShow) this.update();
      else this.clean();
    },
    update() {
      const rect = this.$el.getBoundingClientRect();
      let style;
      let { placement } = this;
      if (placement === 'auto-y') {
        placement = rect.bottom < document.body.clientHeight / 2 ? 'bottom' : 'top';
      }
      if (placement === 'top') {
        style = {
          top: `${rect.top - this.gap}px`,
          left: `${rect.left + rect.width / 2}px`,
        };
      } else if (placement === 'bottom') {
        style = {
          top: `${rect.bottom + this.gap}px`,
          left: `${rect.left + rect.width / 2}px`,
        };
      } else if (placement === 'left') {
        style = {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.left - this.gap}px`,
        };
      } else if (placement === 'right') {
        style = {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + this.gap}px`,
        };
      } else if (process.env.NODE_ENV !== 'production') {
        console.warn(`Unknown placement: ${placement}`);
      }
      const { align } = this;
      let { tooltip } = this;
      const content = this.content || this.$slots.content;
      if (tooltip) {
        tooltip.placement = placement;
        tooltip.align = align;
        tooltip.content = content;
        tooltip.style = style;
      } else {
        tooltip = new Vue({
          data: {
            placement,
            align,
            content,
            style,
          },
          render(h) {
            return h(TooltipContent, {
              props: {
                placement: this.placement,
                align: this.align,
              },
              style: this.style,
            }, [this.content]);
          },
        })
        .$mount();
        document.body.appendChild(tooltip.$el);
        this.tooltip = tooltip;
      }
    },
    clean() {
      if (this.tooltip) {
        const { $el } = this.tooltip;
        this.tooltip.$destroy();
        this.tooltip = null;
        $el.parentNode.removeChild($el);
      }
    },
  },
  created() {
    addTooltip(this);
  },
  mounted() {
    this.render();
  },
  beforeDestroy() {
    removeTooltip(this);
  },
};
</script>
