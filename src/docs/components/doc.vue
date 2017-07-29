<template>
  <section v-html="html" ref="doc"></section>
</template>

<script>
import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github.css';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('javascript', javascript);

export default {
  props: ['md'],
  computed: {
    html() {
      return marked(this.md || '');
    },
  },
  watch: {
    html() {
      // Wait for the DOM to update
      this.$nextTick(this.initCode);
    },
  },
  mounted() {
    this.initCode();
  },
  methods: {
    initCode() {
      const doc = this.$refs.doc;
      if (!doc) return;
      const code = doc.querySelectorAll('pre>code');
      code.forEach(el => { hljs.highlightBlock(el); });
    },
  },
};
</script>
