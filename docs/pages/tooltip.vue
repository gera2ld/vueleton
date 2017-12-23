<template>
  <section>
    <h3>Tooltip</h3>
    Alignment:
    <div class="demo-tooltip-group">
      <tooltip placement="up" align="end" title="hello, world">
        <button>End</button>
      </tooltip>
      <tooltip placement="up" title="hello, world">
        <button>Center</button>
      </tooltip>
      <tooltip placement="up" align="start" title="hello, world">
        <button>Start</button>
      </tooltip>
    </div>
    Placement:
    <div class="demo-tooltip-group">
      <tooltip placement="left" title="hello, world">
        <button>Left</button>
      </tooltip>
      <tooltip placement="up" title="hello, world">
        <button>Up</button>
      </tooltip>
      <tooltip placement="down" title="hello, world">
        <button>Down</button>
      </tooltip>
      <tooltip placement="right" title="hello, world">
        <button>Right</button>
      </tooltip>
    </div>
  </section>
</template>

<script>
import { Tooltip } from 'vueleton';
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
  border: 1px solid #ddd;
  text-align: center;
}
</style>
