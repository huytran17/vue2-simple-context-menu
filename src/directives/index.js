export const clickOutside = {
  bind: function (element, binding, vnode) {
    element.clickOutsideEvent = function (event) {
      const isClickedOutside =
        element !== event.target || !element.contains(event.target);

      if (isClickedOutside) {
        vnode.context[binding.expression](event);
      }
    };
    window.addEventListener("click", element.clickOutsideEvent);
  },
  unbind: function (element) {
    window.removeEventListener("click", element.clickOutsideEvent);
  },
};
