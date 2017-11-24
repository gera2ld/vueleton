<template>
  <div />
</template>

<script>
const defaultOptions = {
  lineNumbers: true,
  tabSize: 2,
};

export default {
  props: ['value', 'options'],
  watch: {
    value: 'update',
    options(options, oldOptions) {
      const { cm } = this;
      if (!cm) return;
      Object.keys(Object.assign({}, oldOptions, options)).forEach(key => {
        if (options[key] !== oldOptions[key]) {
          cm.setOption(key, options[key]);
        }
      });
    },
  },
  methods: {
    update(value) {
      if (value === this.cached) return;
      if (this.cm) this.cm.setValue(this.cached = value == null ? '' : `${value}`);
    },
  },
  mounted() {
    const CodeMirror = require('codemirror'); // eslint-disable-line global-require, import/no-unresolved
    this.cm = CodeMirror(this.$el, Object.assign({}, defaultOptions, this.options));
    this.$emit('ready', this.cm);
    this.cm.on('change', cm => {
      this.$emit('input', this.cached = cm.getValue());
    });
    this.update(this.value);
  },
};
</script>

<style>
.CodeMirror {
  height: auto;
}
</style>
