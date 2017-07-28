<template>
  <div class="demo">
    <nav>
      <h2>Vueleton</h2>
      <div
        class="demo-nav-item"
        v-for="item in items"
        :class="{ active: current === item }"
        v-text="item"
        @click="current = item">
      </div>
    </nav>
    <div>
      <h3 v-text="current"></h3>
      <component :is="current"></component>
    </div>
  </div>
</template>

<script>
import Dropdown from '../components/dropdown/demo';

const components = {
  Dropdown,
};

export default {
  components,
  data() {
    const items = Object.keys(components);
    return {
      items,
      current: items[0],
    };
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
</style>
