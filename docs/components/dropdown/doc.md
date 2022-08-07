## Usage

``` html
<vl-dropdown :closeAfterClick="true">
  <button>Toggle</button>
  <template #content>
    <div class="menu-item">Menu item 1</div>
    <div class="menu-item">Menu item 2</div>
    <div class="menu-item">Menu item 3</div>
  </template>
</vl-dropdown>
```

``` js
import VlDropdown from 'vueleton/lib/dropdown';
```

## API

Show a menu next to the toggle.

| Props           | Description                                                                      | Default  |
|-----------------|----------------------------------------------------------------------------------|----------|
| content         | Content to show in the dropdown.                                                 | none     |
| closeAfterClick | Close the dropdown menu after clicked.                                           | `false`  |
| toggleOnOnly    | Show the dropdown menu instead of toggling on toggle clicked.                    | `false`  |
| focusOpen       | Show the dropdown menu if a `focus` event is emitted from the toggle.            | `false`  |
| align           | Alignment of the dropdown menu relative to the toggle, either `left` or `right`. | `'left'` |
| direction       | The direction to pop up the dropdown menu, either `down` or `up`.                | `'down'` |

### Slots

| Slots     | Description               |
|-----------|---------------------------|
| *default* | The content of the toggle |
| content   | Overrides content props   |
