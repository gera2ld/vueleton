import Vue from 'vue';
import App from './app';

const el = document.createElement('div');
document.body.appendChild(el);

new Vue({
  render: h => h(App),
}).$mount(el);
