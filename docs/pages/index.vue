<template>
  <section>
    Welcome to Vueleton!
    <MarkdownDoc :html="doc" />
  </section>
</template>

<script>
import MarkdownDoc from '~/components/markdown-doc.vue';
import doc from '~/components/home/doc.md.js';

export default {
  components: {
    MarkdownDoc,
  },
  data() {
    return { doc };
  },
};
</script>
