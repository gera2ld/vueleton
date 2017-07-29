const requireComponent = require.context('.', true, /\/\w+\/index\.vue$/);

requireComponent.keys().forEach(key => {
  const component = requireComponent(key).default;
  exports[component.meta.name] = component;
});
