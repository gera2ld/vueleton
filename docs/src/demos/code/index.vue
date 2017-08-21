<template>
  <section>
    <h3>Demo</h3>
    <div v-text="message"></div>
    <select v-model="mode">
      <option v-for="mode in modes" v-text="mode"></option>
    </select>
    <vl-code v-model="code" :options="options" @ready="onReady" />
  </section>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';
import { Code as VlCode } from 'vueleton';
import doc from './doc.md';

export default {
  meta: {
    doc,
  },
  components: {
    VlCode,
  },
  data() {
    return {
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
