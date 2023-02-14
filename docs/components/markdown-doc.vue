<template>
  <section v-html="html"></section>
</template>

<script>
import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import shell from 'highlight.js/lib/languages/shell';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('bash', bash);

export default {
  props: ['html'],
  mounted() {
    const code = this.$el.querySelectorAll('pre>code');
    code.forEach(el => { hljs.highlightElement(el); });
  },
};
</script>
