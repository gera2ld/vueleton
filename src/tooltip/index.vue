<template>
  <span @mouseenter="onEnter" @mouseleave="onLeave" @click.capture="onClick">
    <slot></slot>
  </span>
</template>

<script>
import Vue from 'vue';
import Tooltip from './tooltip.vue';

const tooltips = [];
document.addEventListener('scroll', debounce(updateTooltips, 100), true);

function debounce(func, time) {
  let timer;
  function exec() {
    timer = null;
    func();
  }
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(exec, time);
  };
}

function updateTooltips() {
  tooltips.forEach(tooltip => {
    tooltip.update();
  });
}
function addTooltip(tooltip) {
  tooltips.push(tooltip);
}
function removeTooltip(tooltip) {
  const i = tooltips.indexOf(tooltip);
  if (i >= 0) tooltips.splice(i, 1);
}

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
    content: {
      type: String,
    },
    gap: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      hovered: false,
    };
  },
  watch: {
    hovered: 'update',
  },
  methods: {
    onEnter() {
      this.hovered = true;
    },
    onLeave() {
      this.hovered = false;
    },
    update() {
      if (this.hovered) {
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
        }
        const { align } = this;
        let { tooltip } = this;
        const content = this.content || this.$slots.content;
        if (tooltip) {
          tooltip.style = style;
        } else {
          tooltip = new Vue({
            data: {
              style,
            },
            render(h) {
              return h(Tooltip, {
                props: {
                  placement,
                  align,
                },
                style: this.style,
              }, [content]);
            },
          })
          .$mount();
          document.body.appendChild(tooltip.$el);
          this.tooltip = tooltip;
        }
      } else if (this.tooltip) {
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
  beforeDestroy() {
    this.hovered = false;
    this.update();
    removeTooltip(this);
  },
};
</script>
