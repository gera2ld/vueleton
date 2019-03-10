### Usage

``` html
<vl-code v-model="code" :options="options" @ready="onReady" />
```

``` js
import VlCode from 'vueleton/lib/code/bundle';

// You may register it
import Vue from 'vue';
Vue.use(VlCode);
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
