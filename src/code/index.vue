<template>
  <div />
</template>

<script>
import CodeMirror from 'codemirror';

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
      if (this.cm) this.cm.setValue(this.cached = value);
    },
  },
  mounted() {
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
