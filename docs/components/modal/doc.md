### Usage

``` html
<button @click="visible = true">Show modal</button>
<vl-modal :visible="visible" @close="visible = false">
  <div class="content">
    <p>This is modal body.</p>
  </div>
</vl-modal>
```

``` js
import VlModal from 'vueleton/lib/modal/bundle';

// Show a child component in modal:
VlModal.show(child, {
  transition: 'fade', // see Vue.js <transition>
});
```

### API

Show a modal with optional backdrop.

Props         | Description                         | Default
--------------|-------------------------------------|---------
visible       | Whether to show the modal.          | `false`
backdrop      | Backdrop options, if `backdrop === false`, there will be no backdrop. `backdrop === true` is the same as `backdrop === { close: true }`. If `backdrop.close` is true, a `close` event will be emitted when clicked on backdrop.  | `{ close: true }`

`VlModal.show(childComponent, props)`:
- Parameters:
  - `childComponent`
    Either a VNode object created with `createElement` or
    a function accepting a parameter `createElement` and returning the created VNode object.

  - `props`
    Will be passed to `VlModal`.

- Return an object with following properties:
  - `close`: a function to close the modal immediately.
