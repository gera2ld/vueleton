<template>
  <span
    :class="{ disabled }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @tipshow.stop="hovered = true"
    @tiphide.stop="hovered = false"
    @tiptoggle.stop="hovered = !hovered"
  >
    <slot></slot>
    <teleport to="body">
      <TooltipContent
        v-if="tooltip"
        :placement="tooltip.placement"
        :align="tooltip.align"
        :style="tooltip.style"
      >
        <slot name="content">
          {{ content }}
        </slot>
      </TooltipContent>
    </teleport>
  </span>
</template>

<script>
import TooltipContent from './tooltip-content.vue';

const components = {
  TooltipContent,
/* vue@2
  teleport: () => import('../teleport.vue'),
 */
};

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
  name: 'vl-tooltip',
  components,
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
      tooltip: null,
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
        placement =
          rect.bottom < document.body.clientHeight / 2 ? 'bottom' : 'top';
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
      this.tooltip = {
        placement,
        align: this.align,
        style,
      };
    },
    clean() {
      if (this.tooltip) {
        this.tooltip = null;
      }
    },
  },
  created() {
    addTooltip(this);
  },
  mounted() {
    this.render();
  },
  beforeUnmount() {
    removeTooltip(this);
  },
};
</script>
