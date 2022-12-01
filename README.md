# vue2-simple-context-menu

# Description

This package is available for VueJS 2x

## [View The Examples](https://codesandbox.io/s/serene-dawn-mcv6j9?file=/src/App.vue)

## Installation

From NPM:

```
> npm i vue2-simple-context-menu
```

## Browser

```html
<script
  type="text/javascript"
  src="node_modules/vuejs/dist/vue.min.js"
></script>
<script
  type="text/javascript"
  src="node_modules/vue2-simple-context-menu/dist/vue2-simple-context-menu.min.js"
></script>
<script type="text/javascript">
  Vue.use(Vue2SimpleContextMenu);
</script>
```

## Registration

Import and register the component

```javascript
import Vue2SimpleContextMenu from "vue2-simple-context-menu";

// Global registration
Vue.use(Vue2SimpleContextMenu);

// OR

// Local registration
export default {
  components: {
    Vue2SimpleContextMenu,
  },
};
```

## Usage

```html
<h1 class="test" @contextmenu.prevent="$refs.ctxMenu.showMenu">
  Right click me
</h1>
<context-menu ref="ctxMenu">
  <span @click="something">Item 1</span>
  <span>Item 2</span>
</context-menu>
```

## Contributing

PR's are welcome!
