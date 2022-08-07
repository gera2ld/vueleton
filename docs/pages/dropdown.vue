<template>
  <section>
    <h1>Dropdown</h1>
    <vl-dropdown class="demo-dropdown" :closeAfterClick="true">
      <button>Toggle</button>
      <template v-slot:content>
        <div class="demo-dropdown-item">Menu Item 1</div>
        <div class="demo-dropdown-item">Menu Item 2</div>
        <div class="demo-dropdown-item">Menu Item 3</div>
      </template>
    </vl-dropdown>
    <vl-dropdown class="demo-dropdown">
      <button>Toggle panel</button>
      <template v-slot:content>
        <div class="demo-panel">This is a panel.</div>
      </template>
    </vl-dropdown>
    <vl-dropdown class="demo-dropdown" :closeAfterClick="true" direction="up">
      <button>Toggle up</button>
      <template v-slot:content>
        <div class="demo-dropdown-item">Menu Item 1</div>
        <div class="demo-dropdown-item">Menu Item 2</div>
        <div class="demo-dropdown-item">Menu Item 3</div>
      </template>
    </vl-dropdown>
    <vl-dropdown class="demo-dropdown" :closeAfterClick="true" align="right">
      <button>Toggle right</button>
      <template v-slot:content>
        <div class="demo-dropdown-item">Menu Item 1</div>
        <div class="demo-dropdown-item">Menu Item 2</div>
        <div class="demo-dropdown-item">Menu Item 3</div>
      </template>
    </vl-dropdown>
    <div class="demo-dropdown-menu-bar">
      <vl-dropdown
        class="demo-dropdown"
        :closeAfterClick="true"
        v-for="(menu, i) in menuBar"
        :key="i"
        :value="active === i"
        @input="(value) => onToggle(i, value)"
      >
        <div
          :class="{ active: active === i }"
          v-text="menu[0]"
          @mouseover="onHover(i)"
        ></div>
        <template v-slot:content>
          <div>
            <div
              class="demo-dropdown-menu-item"
              v-for="(item, j) in menu[1]"
              :key="j"
              v-text="item"
            ></div>
          </div>
        </template>
      </vl-dropdown>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import VlDropdown from 'vueleton/lib/dropdown';
import doc from '~/components/dropdown/doc.md';
import store from '~/assets/store';

export default {
  components: {
    VlDropdown,
  },
  data() {
    return {
      active: -1,
      menuBar: [
        ['Menu 1', ['Item 1', 'Item 2', 'Item 3']],
        ['Menu 2', ['Item 4', 'Item 5', 'Item 6']],
      ],
    };
  },
  watch: {
    menuBar(value) {
      console.log(value);
    },
  },
  methods: {
    onToggle(index, value) {
      if (value) {
        this.active = index;
      } else if (this.active === index) {
        this.active = -1;
      }
    },
    onHover(index) {
      if (this.active >= 0 && this.active !== index) {
        this.active = index;
      }
    },
  },
  mounted() {
    store.doc = doc;
  },
};
</script>

<style>
.demo-panel {
  width: 200px;
  padding: 20px;
}

.demo-dropdown {
  &-item {
    padding: 8px 30px;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background: #f0f0f0;
    }
  }
  .vl-dropdown-menu {
    border: 1px solid #bbb;
    background: white;
  }
}

.demo-dropdown-menu-bar {
  display: flex;
  margin-top: 8px;
  background: #f0f0f0;
  .vl-dropdown-toggle > div {
    padding: 0 8px;
    &:hover,
    &.active {
      background: #d0d0d0;
    }
  }
  .vl-dropdown-menu {
    margin-top: 0;
  }
}
.demo-dropdown-menu-item {
  padding: 2px 8px;
  cursor: pointer;
  &:hover {
    background: #d0d0d0;
  }
}
</style>
