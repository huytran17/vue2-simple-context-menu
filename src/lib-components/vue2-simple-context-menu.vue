<template>
  <div v-show="showCtxMenu" v-click-outside="hideMenu" id="vuejs__context-menu">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: "VueJSContextMenu",
  directives: {
    clickOutside: {
      bind: function (element, binding, vnode) {
        element.clickOutsideEvent = function (event) {
          const isClickedOutside =
            element !== event.target || !element.includes(event.target);

          if (isClickedOutside) {
            vnode.context[binding.expression](event);
          }
        };
        window.addEventListener("click", element.clickOutsideEvent);
      },
      unbind: function (element) {
        window.removeEventListener("click", element.clickOutsideEvent);
      },
    },
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
