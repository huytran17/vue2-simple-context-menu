<template>
  <div v-show="showCtxMenu" v-click-outside="hideMenu" id="vuejs__context-menu">
    <slot> </slot>
  </div>
</template>

<script>
import { clickOutside } from "@/directives";

export default {
  name: "VueJSContextMenu",
  directives: {
    clickOutside,
  },
  data() {
    return {
      showCtxMenu: false,
    };
  },
  methods: {
    showMenu(event) {
      this.showCtxMenu = true;

      setTimeout(() => {
        const mouseX = event.pageX;
        const mouseY = event.pageY;

        const ctxMenu = document.getElementById("vuejs__context-menu");
        ctxMenu.style.top = `${mouseY}px`;
        ctxMenu.style.left = `${mouseX}px`;

        const { width: menuWidth, height: menuHeight } =
          ctxMenu.getBoundingClientRect();

        const docWidth = document.documentElement.clientWidth;
        const docHeight = document.documentElement.clientHeight;

        const isOutOfWidth = mouseX + menuWidth > docWidth;
        const isOutOfHeight = mouseY + menuHeight > docHeight;

        const translateXRate = isOutOfWidth ? "-100%" : "0";
        const translateYRate = isOutOfHeight ? "-100%" : "0";

        ctxMenu.style.transform = `translate(${translateXRate}, ${translateYRate})`;
      }, 0);
    },

    hideMenu() {
      this.showCtxMenu = false;
    },
  },
};
</script>

<style scoped>
#vuejs__context-menu {
  min-height: 10px;
  min-width: 100px;
  background: #ffffff;
  border: 1px solid #d3c9c9;
  padding: 4px 6px;
  border-radius: 4px;
  position: absolute;
  z-index: 9999;
}
</style>
