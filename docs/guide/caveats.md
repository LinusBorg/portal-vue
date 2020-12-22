---
sidebar: auto
prev: ./advanced
next: ./migration
---

# Known Caveats

Admittedly, portal-vue uses a little bit of trickery to do what it does. With this come some caveats, which are documented below.

## Local state lost when toggling `disabled`

When toggling the `<portal>` component's `disabled` state, components in the portal slot are destroyed and re-created, which means any changes to their local state are lost.

If you need to persist state, use some sort of [state management](https://portal-vue-next-preview.netlify.com/)

## provide/inject

Due to the way that Vue resolves provides from parent components, it will look for provided objects in the parent of `<portal-target>`, so any `provide`d objects of a parent of `<portal>` will not be available to components within a portal - but it will have access to those provided by parents of the `<portal-target>`.

Also, when using `multiple` portals sending content to one `<portal-target>`, it would be unclear which `<portal>` component's injections should be used.

## `$parent`

For the same reason, `this.$parent` will not give you the parent of the `<Portal>`, instead it will give you the `<PortalTarget>`, so code relying on `$parent` might break.

### [vue-router](https://router.vuejs.org)

`<router-view>` internally walks the $parent chain to find out how many (if any) parent <router-view> components there are. Therefore `<router-view>` inside a `<portal>` will not be able to properly match its nested routes. See [#289](https://github.com/LinusBorg/portal-vue/issues/289) for discussion.

## `$refs`

TODO: verify if this part about refs still applies as-is or needs changing.

In rare cases, you might want to access a DOM element / component that is within the Portal content via a `ref`. This works, but sometimes requires a double `$nextTick`:

```javascript
this.$nextTick().then(
  this.$nextTick(() => {
    this.$refs.yourRef // element should now be in the DOM.
  })
)
```

The reason is that depending on the secnario, it _can_ take one tick for the content to be sent to the [Wormhole](../api/wormhole.md) (the middleman between `<Portal>` and `<PortalTarget>`), and another one to be picked up by the `<PortalTarget>`.
