const requireDemo = require.context('../components', true, /\/\w+\/demo\.vue$/);

const items = requireDemo.keys().map(key => requireDemo(key).default);

items.forEach(item => {
  // eslint-disable-next-line prefer-template
  item.meta.path = '/' + item.meta.name.replace(/[a-z][A-Z]/g, m => `${m[0]}-${m[1]}`).toLowerCase();
});

export default items;
