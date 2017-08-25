![NPM](https://img.shields.io/npm/v/vueleton.svg)
![License](https://img.shields.io/npm/l/vueleton.svg)

> Vueleton = Vue + Skeleton

Vueleton is a component library for [Vue.js](https://vuejs.org/) 2.
It contains useful components with simple style which are easy to be extended.

Installation
---
``` sh
$ npm i vueleton
```

Usage
---
1. Make sure your Webpack has been configured properly to import `.css` files.

1. Import the components as needed:

   ``` js
   import Dropdown from 'vueleton/lib/dropdown';

   // This is equal to:
   import Dropdown from 'vueleton/lib/dropdown/component';
   import 'vueleton/lib/dropdown/style.css';
   ```
