(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{108:function(t,e,o){t.exports=o(109),o(110)},109:function(t,e,o){"use strict";const n=function(t,e,o,n,s,i,d,l,r,c){"boolean"!=typeof d&&(r=l,l=d,d=!1);const a="function"==typeof o?o.options:o;let u;if(t&&t.render&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns,a._compiled=!0,s&&(a.functional=!0)),n&&(a._scopeId=n),i?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,r(t)),t&&t._registeredComponents&&t._registeredComponents.add(i)},a._ssrRegister=u):e&&(u=d?function(t){e.call(this,c(t,this.$root.$options.shadowRoot))}:function(t){e.call(this,l(t))}),u)if(a.functional){const t=a.render;a.render=function(e,o){return u.call(o),t(e,o)}}else{const t=a.beforeCreate;a.beforeCreate=t?[].concat(t,u):[u]}return o}({render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"vl-dropdown",class:"vl-dropdown-"+t.align+" vl-dropdown-"+t.direction,on:{mouseup:t.onMouseUp}},[o("div",{staticClass:"vl-dropdown-toggle",on:{click:t.onToggle,focus:t.onFocus,blur:t.onBlur}},[t._t("toggle")],2),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"active"}],staticClass:"vl-dropdown-menu",on:{mousedown:function(t){t.stopPropagation()}}},[t._t("default")],2)])},staticRenderFns:[]},void 0,{props:{closeAfterClick:{type:Boolean,default:!1},toggleOnOnly:{type:Boolean,default:!1},focusOpen:{type:Boolean,default:!1},align:{type:String,default:"left"},direction:{type:String,default:"down"}},data:()=>({active:!1}),watch:{active(t,e){t!==e&&(t?document.addEventListener("mousedown",this.onClose,!1):document.removeEventListener("mousedown",this.onClose,!1),this.$emit("stateChange",t))}},methods:{onToggle(){this.active=!this.active},onOpen(){this.active=!0},onClose(){this.active=!1},onFocus(){this.focusOpen&&this.onOpen()},onBlur(){const{activeElement:t}=document;t===document.body||this.$el.contains(t)||this.onClose()},onMouseUp(){this.closeAfterClick&&this.onClose()}}},void 0,!1,void 0,!1,void 0,void 0,void 0);n.install=function(t){t.component("vl-dropdown",n)},t.exports=n},110:function(t,e,o){o(111)},111:function(t,e,o){},112:function(t,e,o){"use strict";o(72)},138:function(t,e,o){"use strict";o.r(e);var n=o(1),d=o(108),l=o.n(d),r=o(12);n.default.use(l.a);var c={mounted:function(){r.a.doc='### Usage\n\n``` html\n<vl-dropdown :closeAfterClick="true">\n  <button slot="toggle">Toggle</button>\n  <div class="menu-item">Menu item 1</div>\n  <div class="menu-item">Menu item 2</div>\n  <div class="menu-item">Menu item 3</div>\n</vl-dropdown>\n```\n\n``` js\nimport VlDropdown from \'vueleton/lib/dropdown/bundle\';\n\n// You may register it\nimport Vue from \'vue\';\nVue.use(VlDropdown);\n```\n\n### API\n\nShow a menu next to the toggle.\n\nProps              | Description                               | Default\n-------------------|-------------------------------------------|-------------\ncloseAfterClick    | Close the dropdown menu after clicked.    | `false`\ntoggleOnOnly       | Show the dropdown menu instead of toggling on toggle clicked. | `false`\nfocusOpen          | Show the dropdown menu if a `focus` event is emitted from the toggle.  | `false`\nalign              | Alignment of the dropdown menu relative to the toggle, either `left` or `right`. | `\'left\'`\ndirection          | The direction to pop up the dropdown menu, either `down` or `up`. | `\'down\'`\n'}},v=(o(112),o(4)),component=Object(v.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("h3",[t._v("Dropdown")]),t._v(" "),o("vl-dropdown",{staticClass:"demo-dropdown",attrs:{closeAfterClick:!0}},[o("button",{attrs:{slot:"toggle"},slot:"toggle"},[t._v("Toggle")]),t._v(" "),o("div",{staticClass:"demo-dropdown-item"},[t._v("Menu Item 1")]),t._v(" "),o("div",{staticClass:"demo-dropdown-item"},[t._v("Menu Item 2")]),t._v(" "),o("div",{staticClass:"demo-dropdown-item"},[t._v("Menu Item 3")])]),t._v(" "),o("vl-dropdown",{staticClass:"demo-dropdown"},[o("button",{attrs:{slot:"toggle"},slot:"toggle"},[t._v("Toggle panel")]),t._v(" "),o("div",{staticClass:"demo-panel"},[t._v("\n      This is a panel.\n    ")])]),t._v(" "),o("vl-dropdown",{staticClass:"demo-dropdown",attrs:{closeAfterClick:!0,direction:"up"}},[o("button",{attrs:{slot:"toggle"},slot:"toggle"},[t._v("Toggle up")]),t._v(" "),o("div",{staticClass:"demo-dropdown-item"},[t._v("Menu Item 1")]),t._v(" "),o("div",{staticClass:"demo-dropdown-item"},[t._v("Menu Item 2")]),t._v(" "),o("div",{staticClass:"demo-dropdown-item"},[t._v("Menu Item 3")])]),t._v(" "),o("vl-dropdown",{staticClass:"demo-dropdown",attrs:{closeAfterClick:!0,align:"right"}},[o("button",{attrs:{slot:"toggle"},slot:"toggle"},[t._v("Toggle right")]),t._v(" "),o("div",{staticClass:"demo-dropdown-item"},[t._v("Menu Item 1")]),t._v(" "),o("div",{staticClass:"demo-dropdown-item"},[t._v("Menu Item 2")]),t._v(" "),o("div",{staticClass:"demo-dropdown-item"},[t._v("Menu Item 3")])])],1)}),[],!1,null,null,null);e.default=component.exports},72:function(t,e,o){}}]);