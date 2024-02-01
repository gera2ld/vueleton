<template>
  <span
    :class="{ disabled }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @tipshow.stop="hovered = true"
    @tiphide.stop="hovered = false"
    @tiptoggle.stop="hovered = !hovered"
  >
    <slot :visible="shouldShow"></slot>
    <teleport to="body" v-if="tooltip">
      <TooltipContent
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
import { lifecycleBeforeUnmount } from '../util';

const components = {
  TooltipContent,
/* vue@2 <<
  teleport: () => import('../teleport.vue'),
>> */
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

const PLACEMENT_TOP = 'top';
const PLACEMENT_BOTTOM = 'bottom';
const PLACEMENT_LEFT = 'left';
const PLACEMENT_RIGHT = 'right';
const PLACEMENT_AUTO_Y = 'auto-y';

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
      default: PLACEMENT_AUTO_Y,
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
      let { scrollX: left, scrollY: top } = window;
      let { placement } = this;
      if (placement === PLACEMENT_AUTO_Y) {
        placement =
          rect.bottom < document.body.clientHeight / 2 ? PLACEMENT_BOTTOM : PLACEMENT_TOP;
      }
      if (placement === PLACEMENT_TOP || placement === PLACEMENT_BOTTOM) {
        left += rect.left + rect.width / 2;
        top += placement === PLACEMENT_TOP ? rect.top - this.gap : rect.bottom + this.gap;
      } else if (placement === PLACEMENT_LEFT || placement === PLACEMENT_RIGHT) {
        top += rect.top + rect.height / 2;
        left += placement === PLACEMENT_LEFT ? rect.left - this.gap : rect.right + this.gap;
      } else if (process.env.NODE_ENV !== 'production') {
        console.warn(`Unknown placement: ${placement}`);
      }
      this.tooltip = {
        placement,
        align: this.align,
        style: {
          top: `${top}px`,
          left: `${left}px`,
        },
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
  [lifecycleBeforeUnmount]() {
    removeTooltip(this);
  },
};
</script>
