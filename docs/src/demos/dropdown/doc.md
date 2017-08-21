### Usage

``` html
<vl-dropdown :closeAfterClick="true">
  <button slot="toggle">Toggle</button>
  <div class="menu-item">Menu item 1</div>
  <div class="menu-item">Menu item 2</div>
  <div class="menu-item">Menu item 3</div>
</vl-dropdown>
```

``` js
// ESM way
import { Dropdown as VlDropdown } from 'vueleton';

// CommonJS way
import VlDropdown from 'vueleton/lib/dropdown';
import 'vueleton/lib/dropdown/index.css';
```

### API

Show a menu next to the toggle.

Props              | Description                               | Default
-------------------|-------------------------------------------|-------------
closeAfterClick    | Close the dropdown menu after clicked.    | `false`
toggleOnOnly       | Show the dropdown menu instead of toggling on toggle clicked. | `false`
focusOpen          | Show the dropdown menu if a `focus` event is emitted from the toggle.  | `false`
align              | Alignment of the dropdown menu relative to the toggle, either `left` or `right`. | `'left'`
direction          | The direction to pop up the dropdown menu, either `down` or `up`. | `'down'`