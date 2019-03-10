<template>
  <section>
    <h3>Dropdown</h3>
    <vl-dropdown class="demo-dropdown" :closeAfterClick="true">
      <button slot="toggle">Toggle</button>
      <div class="demo-dropdown-item">Menu Item 1</div>
      <div class="demo-dropdown-item">Menu Item 2</div>
      <div class="demo-dropdown-item">Menu Item 3</div>
    </vl-dropdown>
    <vl-dropdown class="demo-dropdown">
      <button slot="toggle">Toggle panel</button>
      <div class="demo-panel">
        This is a panel.
      </div>
    </vl-dropdown>
    <vl-dropdown class="demo-dropdown" :closeAfterClick="true" direction="up">
      <button slot="toggle">Toggle up</button>
      <div class="demo-dropdown-item">Menu Item 1</div>
      <div class="demo-dropdown-item">Menu Item 2</div>
      <div class="demo-dropdown-item">Menu Item 3</div>
    </vl-dropdown>
    <vl-dropdown class="demo-dropdown" :closeAfterClick="true" align="right">
      <button slot="toggle">Toggle right</button>
      <div class="demo-dropdown-item">Menu Item 1</div>
      <div class="demo-dropdown-item">Menu Item 2</div>
      <div class="demo-dropdown-item">Menu Item 3</div>
    </vl-dropdown>
  </section>
</template>

<script>
import Vue from 'vue';
import VlDropdown from 'vueleton/lib/dropdown/bundle';
import doc from '~/components/dropdown/doc.md';
import store from '~/assets/store';

Vue.use(VlDropdown);

export default {
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
</style>
