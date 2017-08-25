<template>
  <section>
    Welcome to Vueleton!
  </section>
</template>

<script>
import doc from '~/components/home/doc.md';
import store from '~/assets/store';

export default {
  mounted() {
    store.doc = doc;
  },
};
</script>
