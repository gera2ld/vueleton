const requireDemo = require.context('./demos', true, /\/\w+\/index\.vue$/);

const items = requireDemo.keys()
.map(key => {
  const item = requireDemo(key).default;
  const path = key.slice(1, -10); // ./xxx/index.vue
  item.meta = Object.assign({}, item.meta, {
    path,
    name: path.slice(1).replace(/(?:^|-)(.)/, (m, g) => g.toUpperCase()),
  });
  return item;
});

export default items;
