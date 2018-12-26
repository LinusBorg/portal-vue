# Known Caveats

Admittedly, portal-vue does a little bit of trickery to do what it does. With this come some caveats, which are documented below.

## Display in Devtools

The Portal should be completely transparent. By that we mean that calling `this.$parent` in a component within a portal slot should _not_ point to the `Portal` or `PortalTarget` component, but to the `Portal`'s parent component. That way, code using `$parent` can work inside a Portal exactly the same as outside of it.

For version **`<=1.2.0`**, we achieved that by making `Portal` and `PortalTarget` so-called `abstract` components. While you may never have heard of them, you know one already: `<transition>`. That had the side-effect that `Portal` and `PortalTarget` don't show up in the devtools.

When we introduced support for scoped slots in version `1.3.0`, that strick didn't work anymore - abstract components can't receive scoped slots. So we had to use small trick to keep `$parent` point to the real parent component while supporting scoped slots.

The result of that trick is that in Devtools, a component that you nested inside of a `<portal>` element's slot will not show up as a child in the component tree, but as a sibling.

```
// normally:
<ComponentA>
-- <ComponentB>

// for the Portal
<portal>
<ComponentX>
```

## local state lost when toggling `disabled`

When togling the `<portal>` component's `disabled` state, components in the portal slot are destroyed and re-created, which means any changes to their local state are lost.

## provide/inject broken

Due to the way that Vue resolves provides from parent components, it would look for provided objects in the parent of `<portal-target>`, so any `provide`d objects of a parent of `<portal>` will not be available to components within a portal - but it will have access to those provided by parents of the `<portal-target>`.

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
