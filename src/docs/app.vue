<template>
  <div class="demo">
    <nav>
      <router-link to="/"><h1>Vueleton</h1></router-link>
      <section>
        <router-link
          class="demo-nav-item"
          v-for="item in items"
          :class="{ active: current === item }"
          :to="item.meta.path"
          v-text="item.meta.name">
        </router-link>
      </section>
      <footer>
        &copy; Gerald 2017
      </footer>
    </nav>
    <div>
      <a href="https://github.com/gera2ld/vueleton"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></a>
      <h2 v-text="currentMeta.name"></h2>
      <router-view></router-view>
      <doc :md="currentMeta.doc"></doc>
    </div>
  </div>
</template>

<script>
import Doc from './components/doc';
import items from './items';

export default {
  components: items.reduce((res, item) => Object.assign(res, {
    [item.meta.name]: item,
  }), { Doc }),
  data() {
    return {
      items,
    };
  },
  computed: {
    current() {
      const { matched } = this.$route;
      return matched[matched.length - 1].components.default;
    },
    currentMeta() {
      const { current } = this;
      return (current && current.meta) || {};
    },
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
    display: flex;
    flex-direction: column;
    border-right: 1px solid #bbb;
    > section {
      flex: auto;
      overflow-y: auto;
    }
    h1 {
      color: dodgerblue;
    }
    a {
      text-decoration: none;
    }
  }
  &-nav-item {
    display: block;
    padding: 5px;
    color: #333;
    cursor: pointer;
    &:hover,
    &.active {
      color: dodgerblue;
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
