import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app';
import Home from './home';
import items from './items';

Vue.use(VueRouter);

const el = document.createElement('div');
document.body.appendChild(el);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    ...items.map(item => ({
      path: item.meta.path,
      component: item,
    })),
    { path: '*', redirect: '/' },
  ],
});

new Vue({
  router,
  render: h => h(App),
}).$mount(el);
