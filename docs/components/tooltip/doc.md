### Usage

``` html
<vl-tooltip title="hello, world" align="start" placement="bottom">
  <button>Tooltip</button>
</vl-tooltip>
```

``` js
import VlTooltip from 'vueleton/lib/tooltip/bundle';
```

### API

Show a tooltip next to the child element.

Props              | Description                               | Default
-------------------|-------------------------------------------|-------------
title              | Content to show in the tooltip.           | none
align              | Content alignment, possible values are `start`, `end` and `center`. | `'center'`
placement          | Placement of the tooltip, possible values are `top`, `bottom`, `left`, `right` and `auto-y`. If `placement` is `auto-y`, the tooltip will be placed `top` if content is in the bottom half of screen, otherwise `bottom`. | `'auto-y'`
