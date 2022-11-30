<script>
import Vue from "vue";
// Uncomment import and local "components" registration if library is not registered globally.
// import { VuejsContextMenuSample } from '@/entry.esm';

export default Vue.extend({
  name: "ServeDev",
  // components: {
  //  VuejsContextMenuSample,
  // }
  data() {
    return {
      items: [
        {
          text: "ABC",
        },
        {
          text: "DEF",
        },
        {
          text: "GHI",
        },
      ],
    };
  },
  methods: {
    showAlert() {
      window.alert("Hello!");
    },
  },
});
</script>

<template>
  <div id="app">
    <h1 @contextmenu.prevent="$refs.ctxMenu.showMenu">Right click 1</h1>
    <context-menu ref="ctxMenu">
      <div v-for="(item, index) in items" :key="index">
        <div @click="showAlert">{{ item.text }}</div>
      </div>
    </context-menu>
    <h1 @contextmenu.prevent="$refs.ctxMenu.showMenu">Right click 2</h1>
  </div>
</template>

<style scoped>
h1 {
  width: 100%;
  border: 1px solid black;
}
</style>
