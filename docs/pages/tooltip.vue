<template>
  <section>
    <h3>Tooltip</h3>
    Alignment:
    <div class="demo-tooltip-group">
      <tooltip placement="top" align="end" content="hello, world">
        <button>End</button>
      </tooltip>
      <tooltip placement="top" content="hello, world">
        <button>Center</button>
      </tooltip>
      <tooltip placement="top" align="start" content="hello, world">
        <button>Start</button>
      </tooltip>
    </div>
    Placement:
    <div class="demo-tooltip-group">
      <tooltip placement="left" content="hello, world">
        <button>Left</button>
      </tooltip>
      <tooltip placement="top" content="hello, world">
        <button>Up</button>
      </tooltip>
      <tooltip placement="bottom" content="hello, world">
        <button>Down</button>
      </tooltip>
      <tooltip placement="right" content="hello, world">
        <button>Right</button>
      </tooltip>
    </div>
  </section>
</template>

<script>
import Tooltip from 'vueleton/es/tooltip/bundle';
import doc from '~/components/tooltip/doc.md';
import store from '~/assets/store';

export default {
  components: {
    Tooltip,
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
