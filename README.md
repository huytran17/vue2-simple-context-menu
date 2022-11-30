# vue2-simple-context-menu

# Description

This package is available for VueJS 2x

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
  src="node_modules/vuejs-context-menu/dist/vuejs-context-menu.min.js"
></script>
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
