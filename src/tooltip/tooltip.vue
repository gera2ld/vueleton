<template>
  <div
    class="vl-tooltip"
    :class="`vl-tooltip-${placement} vl-tooltip-align-${align}`">
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

<style>
$bg-color: rgba(0,0,0,.8);
$border-side-width: 4px;
$border-side: $border-side-width solid transparent;
$border-base: 6px solid $bg-color;
$max-width: 250px;

.vl-tooltip {
  position: absolute;
  color: white;
  font-size: 12px;
  line-height: 1.4;
  z-index: 100;
  > i {
    position: absolute;
  }
  > .vl-tooltip-wrap {
    position: absolute;
  }
  &-wrap {
    width: $max-width;
  }
  &-content {
    display: inline-block;
    padding: 8px;
    background: $bg-color;
    border-radius: 6px;
    text-align: left;
  }
  &-top {
    > i {
      top: 0;
      border-top: $border-base;
      border-left: $border-side;
      border-right: $border-side;
    }
    > .vl-tooltip-wrap {
      bottom: 0;
    }
  }
  &-bottom {
    > i {
      bottom: 0;
      border-left: $border-side;
      border-right: $border-side;
      border-bottom: $border-base;
    }
    > .vl-tooltip-wrap {
      top: 0;
    }
  }
  &-top,
  &-bottom {
    > i {
      margin-left: -$border-side-width;
    }
    &.vl-tooltip-align-center {
      > .vl-tooltip-wrap {
        margin-left: calc(-$max-width / 2);
        text-align: center;
      }
    }
    &.vl-tooltip-align-start {
      > .vl-tooltip-wrap {
        margin-left: -10px;
        text-align: left;
      }
    }
    &.vl-tooltip-align-end {
      > .vl-tooltip-wrap {
        right: 0;
        margin-right: -10px;
        text-align: right;
      }
    }
  }
  &-left {
    > i {
      left: 0;
      border-top: $border-side;
      border-bottom: $border-side;
      border-left: $border-base;
    }
    > .vl-tooltip-wrap {
      right: 0;
      text-align: right;
      transform: translateY(-50%);
    }
  }
  &-right {
    > i {
      right: 0;
      border-top: $border-side;
      border-bottom: $border-side;
      border-right: $border-base;
    }
    > .vl-tooltip-wrap {
      left: 0;
      transform: translateY(-50%);
    }
  }
  &-left,
  &-right {
    > i {
      margin-top: -$border-side-width;
    }
  }
}
</style>
