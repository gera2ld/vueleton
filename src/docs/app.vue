<template>
  <div class="demo">
    <nav>
      <h1>Vueleton</h1>
      <div
        class="demo-nav-item"
        v-for="item in items"
        :class="{ active: current === item }"
        v-text="getMeta(item, 'name')"
        @click="current = item">
      </div>
    </nav>
    <div>
      <h2 v-text="getMeta(current, 'name')"></h2>
      <component :is="current"></component>
      <doc :md="getMeta(current, 'doc')"></doc>
    </div>
  </div>
</template>

<script>
import Doc from './components/doc';
import Dropdown from '../components/dropdown/demo';

const components = {
  Dropdown,
};

const items = Object.keys(components).map(key => components[key]);

export default {
  components: Object.assign({
    Doc,
  }, components),
  data() {
    return {
      items,
      current: items[0],
    };
  },
  methods: {
    getMeta(item, key) {
      const meta = item && item.meta;
      return meta && meta[key];
    },
  },
};
</script>

<style>
html,
body,
.demo {
  margin: 0;
  padding: 0;
  height: 100%;
}

.demo {
  display: flex;
  margin: 0 auto;
  > * {
    flex: 1;
    padding: 20px;
  }
  > nav {
    flex: 0 0 200px;
    border-right: 1px solid #bbb;
  }
  &-nav-item {
    color: #333;
    cursor: pointer;
    &:hover,
    &.active {
      color: #83d6de;
    }
  }
}

table {
  border-collapse: collapse;
}

th,
td {
  padding: 3px 5px;
  border: 1px solid #bbb;
}
</style>
