### Usage

``` html
<vl-code v-model="code" :options="options" @ready="onReady" />
```

``` js
// ESM way
import { Code as VlCode } from 'vueleton';

// CommonJS way
import VlCode from 'vueleton/lib/code';
import 'vueleton/lib/code/index.css';
```

### API

Props         | Description                         | Default
--------------|-------------------------------------|---------
code          | The string of code.                 | None
options       | Options object passed to CodeMirror. | `{lineNumbers: true, tabSize: 2}`

Events:

Events        | Description                         | Arguments
--------------|-------------------------------------|-----------
ready         | When CodeMirror instance is ready.  | cm: the CodeMirror instance
