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
import VlModal from 'vueleton/lib/modal';
import 'vueleton/lib/modal.css';

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
backdrop      | Whether to show the backdrop when modal is visible. | `true`
backdropClose | Whether to emit a `close` event when clicked on backdrop. | `true`

`VlModal.show`:
- Parameters:
  - `childComponent`
  - `props`
    Will be passed to `VlModal`.
- Return an object with following properties:
  - `close`: a function to close the modal immediately.
