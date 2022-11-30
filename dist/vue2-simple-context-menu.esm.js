//
//
//
//
//
//

var script = {
  name: "VueJSContextMenu",
  directives: {
    clickOutside: {
      bind: function (element, binding, vnode) {
        element.clickOutsideEvent = function (event) {
          const isClickedOutside = element !== event.target || !element.contains(event.target);
          if (isClickedOutside) {
            vnode.context[binding.expression](event);
          }
        };
        window.addEventListener("click", element.clickOutsideEvent);
      },
      unbind: function (element) {
        window.removeEventListener("click", element.clickOutsideEvent);
      }
    }
  },
  data() {
    return {
      showCtxMenu: false
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
        const {
          width: menuWidth,
          height: menuHeight
        } = ctxMenu.getBoundingClientRect();
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
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showCtxMenu,
      expression: "showCtxMenu"
    }, {
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.hideMenu,
      expression: "hideMenu"
    }],
    attrs: {
      "id": "vuejs__context-menu"
    }
  }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

/* style */
const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-76eff592_0", {
    source: "#vuejs__context-menu[data-v-76eff592]{min-height:10px;min-width:100px;background:#fff;border:1px solid #d3c9c9;padding:4px 6px;border-radius:4px;position:absolute;z-index:9999}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__ = "data-v-76eff592";
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);
var __vue_component__$1 = __vue_component__;

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ContextMenu: __vue_component__$1
});

// Import vue components

// install function executed by Vue.use()
const install = function installVue2SimpleContextMenu(Vue) {
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    Vue.component(componentName, component);
  });
};

export { __vue_component__$1 as ContextMenu, install as default };
