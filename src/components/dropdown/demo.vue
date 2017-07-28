<template>
  <div>
    <dropdown class="demo-dropdown">
      <button slot="toggle">Toggle</button>
      <button>Menu Item 1</button>
      <button>Menu Item 2</button>
      <button>Menu Item 3</button>
    </dropdown>
  </div>
</template>

<script>
import Dropdown from '.';

export default {
  components: {
    Dropdown,
  },
};
</script>

<style>
.demo-dropdown {
  button {
    display: block;
    white-space: nowrap;
  }
}
</style>
