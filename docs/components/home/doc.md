![NPM](https://img.shields.io/npm/v/vueleton.svg)
![License](https://img.shields.io/npm/l/vueleton.svg)

> Vueleton = Vue + Skeleton

Vueleton is a component library for [Vue.js](https://vuejs.org/) 2.
It contains useful components with simple style which are easy to be extended.

Installation
---
``` sh
$ npm i vueleton
# or
$ yarn add vueleton
```

Usage
---
There are two ways to import components from Vueleton:

- Import component and style respectively:

  ``` js
  import VlDropdown from 'vueleton/lib/dropdown';
  import 'vueleton/lib/dropdown/style.css';
  ```

- Use [bable-plugin-import](https://github.com/ant-design/babel-plugin-import) to make it easy:

  ``` js
  import { Dropdown as VlDropdown, Code as VlCode } from 'vueleton';
  ```

  Add plugin to your `.babelrc`:

  ``` js
  {
    // ...
    "plugins": ["import", {
      "libraryName": "vueleton",
      "style": true
    }],
  }
  ```
