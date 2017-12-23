<template>
  <div class="demo">
    <nav>
      <nuxt-link to="/"><h1>Vueleton</h1></nuxt-link>
      <section class="demo-nav-items">
        <nuxt-link to="/code/">Code</nuxt-link>
        <nuxt-link to="/dropdown/">Dropdown</nuxt-link>
        <nuxt-link to="/modal/">Modal</nuxt-link>
        <nuxt-link to="/tooltip/">Tooltip</nuxt-link>
      </section>
      <footer>
        <p>Designed with &hearts; by <a href="https://gerald.top">Gerald</a></p>
      </footer>
    </nav>
    <div>
      <a href="https://github.com/gera2ld/vueleton"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></a>
      <nuxt />
      <doc :md="doc" />
    </div>
  </div>
</template>

<script>
import Doc from '~/components/doc';
import store from '~/assets/store';

export default {
  components: {
    Doc,
  },
  data() {
    return store;
  },
};
</script>
