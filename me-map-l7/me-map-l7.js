import { defineComponent as L, ref as v, inject as _, provide as O, onMounted as A, onBeforeUnmount as F, renderSlot as P, createCommentVNode as S } from "vue";
import { PointLayer as V } from "@antv/l7";
const u = /* @__PURE__ */ L({
  __name: "point-layer",
  props: {
    id: {},
    visible: { type: Boolean },
    zIndex: {},
    pickingBuffer: {},
    blend: {},
    enablePropagation: { type: Boolean },
    filter: {},
    size: {},
    color: {},
    shape: {},
    style: {},
    texture: {},
    active: { type: [Boolean, Object] },
    select: { type: [Boolean, Object] },
    autoFit: { type: Boolean },
    icon: {},
    "on-click": {},
    "on-dblclick": {},
    "on-mousemove": {},
    "on-mouseout": {},
    "on-mouseup": {},
    "on-mousedown": {},
    "on-contextmenu": {},
    "on-unclick": {},
    "on-unmousemove": {},
    "on-unmouseup": {},
    "on-unmousedown": {},
    "on-uncontextmenu": {},
    "on-unpick": {},
    "on-touchstart": {},
    "on-touchend": {},
    "on-inited": {},
    "on-add": {},
    "on-remove": {},
    "on-legend": {}
  },
  setup(s) {
    const r = s, n = v(_("mapScene")), e = v();
    O("layer", e);
    const g = async () => {
      const { id: t, icon: o } = r;
      if (n.value) {
        const a = n.value.getScene();
        await w(n.value, o), a.getLayerByName(t) || k(a, r);
      }
    }, k = (t, o) => {
      const { id: a, visible: d, zIndex: j, autoFit: x, pickingBuffer: B, blend: h, shape: i, size: l, color: c, style: p, active: z, select: I, texture: y, filter: f } = o;
      e.value = new V({
        name: a,
        visible: d || !0,
        zIndex: j || 1,
        pickingBuffer: B,
        blend: h
      }), i && (typeof i == "string" ? e.value.shape(i) : typeof i == "object" && e.value.shape(i.type, i.callback)), l && (typeof l == "number" || typeof l == "string" ? e.value.size(l) : typeof l == "object" && e.value.size(l.type, l.callback)), c && (typeof c == "string" ? e.value.color(c) : typeof c == "object" && e.value.color(c.type, c.callback)), p && typeof p == "object" && e.value.style(p), e.value.active(z || !1), e.value.select(I || !1), e.value.setAutoFit(x || !1), f && typeof f == "object" && e.value.filter(f.type, f.callback), y && typeof y == "string" && e.value.texture(y);
    }, w = async (t, o) => {
      if (o)
        if (Array.isArray(o))
          for (let a of o)
            await t.addImage(a.name, a.url);
        else
          await t.addImage(o.name, o.url);
    };
    return A(() => {
      g();
    }), F(() => {
    }), (t, o) => e.value ? P(t.$slots, "default", { key: 0 }) : S("", !0);
  }
});
u.name = "me-point-layer";
u.install = (s) => {
  s.component(u.name, u);
};
const m = {
  MePointLayer: u
}, b = function(s) {
  Object.keys(m).forEach((r) => {
    const n = m[r];
    n.name && s.component(n.name, n);
  });
};
typeof window < "u" && window.Vue && b(window.Vue);
const N = {
  install: b,
  ...m
};
export {
  N as default
};
