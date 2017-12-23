### Usage

``` html
<vl-tooltip title="hello, world" align="start" placement="down">
  <button>Tooltip</button>
</vl-tooltip>
```

``` js
import VlTooltip from 'vueleton/lib/tooltip';
```

### API

Show a tooltip next to the child element.

Props              | Description                               | Default
-------------------|-------------------------------------------|-------------
title              | Content to show in the tooltip.           | none
align              | Content alignment, possible values are `start`, `end` and `center`. | `'center'`
placement          | Placement of the tooltip, possible values are `up`, `down`, `left`, `right` and `auto-y`. If `placement` is `auto-y`, the tooltip will be placed `up` if content is in the bottom half of screen, otherwise `down`. | `'auto-y'`
