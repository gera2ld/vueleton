<template>
  <section>
    <h1>Code</h1>
    <div v-text="message"></div>
    <select v-model="mode">
      <option v-for="mode in modes" v-text="mode"></option>
    </select>
    <VlCode v-model="code" :options="options" @ready="onReady" />
    <MarkdownDoc :html="doc" />
  </section>
</template>

<script>
import MarkdownDoc from '~/components/markdown-doc.vue';
import doc from '~/components/code/doc.md.js';
import VlCode from '~/components/code/vl-code';

export default {
  components: {
    MarkdownDoc,
    VlCode,
  },
  data() {
    return {
      doc,
      message: '',
      code: `\
console.log("hello, world");

body {
  background: white;
}

Test \`markdown\`.`,
      options: {
        mode: 'javascript',
      },
      modes: [
        'javascript',
        'css',
        'markdown',
      ],
    };
  },
  computed: {
    mode: {
      get() {
        return this.options.mode;
      },
      set(mode) {
        this.options = Object.assign({}, this.options, {
          mode,
        });
      },
    },
  },
  methods: {
    onReady(/* cm */) {
      this.message = 'CodeMirror is ready!';
    },
  },
};
</script>
