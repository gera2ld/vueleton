### Usage

``` html
<button @click="visible = true">Show modal</button>
<modal :visible="visible" @close="visible = false">
  <div class="content">
    <p>This is modal body.</p>
  </div>
</modal>
```

```js
import Modal from 'vueleton/lib/modal';
import 'vueleton/lib/modal.css';
```

### API

Show a modal with optional backdrop.

Props         | Description                         | Default
--------------|-------------------------------------|---------
visible       | Whether to show the modal.          | `false`
backdrop      | Whether to show the backdrop when modal is visible. | `true`
backdropClose | Whether to emit a `close` event when clicked on backdrop. | `true`
