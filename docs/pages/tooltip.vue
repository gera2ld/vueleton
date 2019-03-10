<template>
  <section>
    <h3>Tooltip</h3>
    Alignment:
    <div class="demo-tooltip-group">
      <vl-tooltip placement="top" align="end" content="hello, world">
        <button>End</button>
      </vl-tooltip>
      <vl-tooltip placement="top" content="hello, world">
        <button>Center</button>
      </vl-tooltip>
      <vl-tooltip placement="top" align="start" content="hello, world">
        <button>Start</button>
      </vl-tooltip>
    </div>
    Placement:
    <div class="demo-tooltip-group">
      <vl-tooltip placement="left" content="hello, world">
        <button>Left</button>
      </vl-tooltip>
      <vl-tooltip placement="top" content="hello, world">
        <button>Up</button>
      </vl-tooltip>
      <vl-tooltip placement="bottom" content="hello, world">
        <button>Down</button>
      </vl-tooltip>
      <vl-tooltip placement="right" content="hello, world">
        <button>Right</button>
      </vl-tooltip>
    </div>
    Active:
    <div class="demo-tooltip-group">
      <vl-tooltip placement="left" :noMouse="true" :active="active" content="hello, world">
        <button @click="active = !active">Toggle</button>
      </vl-tooltip>
      <vl-tooltip placement="bottom" :noMouse="true" :active="true" :content="enabled ? 'Enabled' : 'Disabled'">
        <button @click="enabled = !enabled" v-text="enabled ? 'Disable' : 'Enable'" />
      </vl-tooltip>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import VlTooltip from 'vueleton/lib/tooltip/bundle';
import doc from '~/components/tooltip/doc.md';
import store from '~/assets/store';

Vue.use(VlTooltip);

export default {
  data() {
    return {
      active: false,
      enabled: false,
    };
  },
  mounted() {
    store.doc = doc;
  },
};
</script>

<style>
.demo-tooltip-group {
  box-sizing: border-box;
  height: 80px;
  padding: 30px 0;
  border: 1px solid #ddd;
  text-align: center;
  overflow: auto;
  &::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 80px;
    vertical-align: top;
  }
}
</style>
