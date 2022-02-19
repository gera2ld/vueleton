<template>
  <div />
</template>

<script>
import CodeMirror from 'codemirror';
import { modelFields } from '../util';

const defaultOptions = {
  lineNumbers: true,
  tabSize: 2,
};

export default {
  name: 'vl-code',
  props: ['options', modelFields.value],
  emits: ['ready', modelFields.update],
  watch: {
    [modelFields.value]: 'update',
    options(options, oldOptions) {
      const { cm } = this;
      if (!cm) return;
      Object.keys({ ...oldOptions, ...options }).forEach((key) => {
        if (options[key] !== oldOptions[key]) {
          cm.setOption(key, options[key]);
        }
      });
    },
  },
  methods: {
    update(value) {
      if (value === this.cached) return;
      if (this.cm)
        this.cm.setValue((this.cached = value == null ? '' : `${value}`));
    },
  },
  mounted() {
    this.cm = CodeMirror(
      this.$el,
      Object.assign({}, defaultOptions, this.options)
    );
    this.$emit('ready', this.cm);
    this.cm.on('change', (cm) => {
      this.$emit(modelFields.update, (this.cached = cm.getValue()));
    });
    this.update(this.value);
  },
};
</script>

<style src="./style.css"></style>
