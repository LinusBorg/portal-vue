# Known Caveats

Admittedly, portal-vue does a little bit of trickery to do what it does. With this come some caveats, which are documented below.

## Abstract components

`Portal` and `PortalTarget` are abstract components, which was necessary to make `$parent` work in the slot content as if the portal
did not exist, and keep pointing to the parent component of the portal.

That means they behave a bit differently in two ways:

1. They don't show up in vue-devtools.
2. they don't show up in `$children` but components in the portal's content will.

## Server-Side Rendering

When you use [Vue's SSR capabilities](https://ssr.vuejs.org), portal-vue can't work reliably because Vue renders the page directly to a string, there are not reactive updates applied. That means that a `<portal-target>` appearing before a `<portal>` will render an empty div on the server whereas it will render the sent content on the client, resulting in a hydration vdom mismatch error.

### Solution

The incredible @egoist has written a *really* tiny [component called `<no-ssr>`](https://github.com/egoist/vue-no-ssr), which can solve this problem. You wrap your `<portal-target>` elements in it, and it will prevent rendering on the server and on client during hydration, preventing the error described above.. Immediatly after hyration, it will render the previously "hidden" content, so that the `<portal-target>` will render its content. Usually the user can hardly notice this as the update is near-immediate.

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

