# vuejs-context-menu

# Description

This package is available for VueJS 2x

## [View The Examples](https://codesandbox.io/s/vue-2-playground-forked-wqy5nf?file=/src/App.vue)

![image](https://user-images.githubusercontent.com/68387887/200896104-8fae132e-393c-4027-8faa-05845af5bd83.png)
![image](https://user-images.githubusercontent.com/68387887/200896417-baaafec6-8bab-4b9d-9db4-ce469edafcd5.png)

## Installation

From NPM:

```
> npm i vuejs-context-menu
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
