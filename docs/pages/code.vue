<template>
  <section>
    <h3>Code</h3>
    <div v-text="message"></div>
    <select v-model="mode">
      <option v-for="mode in modes" v-text="mode"></option>
    </select>
    <vl-code v-if="mounted" v-model="code" :options="options" @ready="onReady" />
  </section>
</template>

<script>
import doc from '~/components/code/doc.md';
import store from '~/assets/store';

export default {
  components: {
    VlCode: () => import('~/components/code/vl-code'),
  },
  data() {
    return {
      mounted: false,
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
  mounted() {
    this.mounted = true;
    store.doc = doc;
  },
  methods: {
    onReady(/* cm */) {
      this.message = 'CodeMirror is ready!';
    },
  },
};
</script>
