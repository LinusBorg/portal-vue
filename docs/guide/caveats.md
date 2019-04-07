---
sidebar: auto
prev: ./advanced
next: ./migration
---

# Known Caveats

Admittedly, portal-vue does a little bit of trickery to do what it does. With this come some caveats, which are documented below.

## Local state lost when toggling `disabled`

When togling the `<portal>` component's `disabled` state, components in the portal slot are destroyed and re-created, which means any changes to their local state are lost.

if you need to persist state, use some sort of [state management](https://portal-vue-next-preview.netlify.com/)

## provide/inject

Due to the way that Vue resolves provides from parent components, it would look for provided objects in the parent of `<portal-target>`, so any `provide`d objects of a parent of `<portal>` will not be available to components within a portal - but it will have access to those provided by parents of the `<portal-target>`.

## `$parent`

For the same reason, `this.$parent` will not give your the parent of the `<Portal>`, it will give your the `<PortalTarget>`, so code relying on `$parent` might break

## `$refs`

In rare cases, you might want to access a DOM element / component that is within the Portal content via a `ref`. This works, but sometimes requires a double `$nextTick`:

```javascript
this.$nextTick().then(
  this.$nextTick(() => {
    this.$refs.yourRef // element should now be in the DOM.
  })
)
```

the reason is that depending on the secnario, it _can_ take one tick for the content to be sent to the [Wormhole](../api/wormhole.md) (the middleman between `<Portal>` and `<PortalTarget>`), and another one to be picked up by the `<PortalTarget>`.

## Server-Side Rendering

When you use [Vue's SSR capabilities](https://ssr.vuejs.org), portal-vue can't work reliably because Vue renders the page directly to a string, there are not reactive updates applied. That means that a `<portal-target>` appearing before a `<portal>` will render an empty div on the server whereas it will render the sent content on the client, resulting in a hydration vdom mismatch error.

### Solution

[@egoist](https://github.com/egoist) has written a _really_ tiny [component called `<no-ssr>`](https://github.com/egoist/vue-no-ssr), which can solve this problem. You wrap your `<portal-target>` elements in it, and it will prevent rendering on the server as well as on the client during hydration, preventing the error described above. Immediatly after hyration, it will render the previously "hidden" content, so that the `<portal-target>` will render its content. Usually the user can hardly notice this as the update is near-immediate.

Example:

```html
<no-ssr>
  <portal-target name="destination">
</no-ssr>

<!-- with placeholder text, usually not necessary -->
<no-ssr placeholder="Loading...">
  <portal-target name="destination">
</no-ssr>
```
