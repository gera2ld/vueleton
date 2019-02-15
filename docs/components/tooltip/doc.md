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
noMouse            | If set to `true`, mouse events will be ignored and the tooltip will be visible only if `active` is set to `true`. | `false`
active             | If set to `true`, the tooltip will be visible no matter whether the mouse is over. | `false`
