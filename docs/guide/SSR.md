# Server-Side Rendering (SSR)

When using [Vue's SSR capabilities](https://ssr.vuejs.org), portal-vue can't work reliably for a couple of reasons:

1. The internal Store (the [Wormhole](../api/wormhole.md)) that's caching vnodes and connecting `<portal>` components to their `<portal-target>` counterparts, is a singleton. As such, changes to the Wormhole persist between requests, leading to all sorts of problems.
2. In SSR, Vue renders the page directly to a string, there are not reactive updates applied. Consequently, a `<portal-target>` appearing before a `<portal>` will render an empty div on the server whereas it will render the sent content on the client, resulting in a hydration vdom mismatch error, while a `<portal-target>` _following_ a `<portal>` would technically work.

## Solutions

### Disabling the portal on the server

For the aforementioned reasons, starting with <Badge text="2.1.2" />, content won't be cached in the Wormhole anymore when on the server. Consequently, the HTML rendered by the server won't contain any DOM nodes in place of any `<portal-target>`

### Handling on the client

We want to display the `<portal-target>` content on the client, though. In order to prevent any hydration mismatches, we can use a _really_ tiny [component called `<no-ssr>`](https://github.com/egoist/vue-no-ssr), written by [@egoist](https://github.com/egoist), which can solve this problem.

We wrap oour `<portal-target>` elements in it, and it will prevent rendering on the server as well as on the client during hydration, preventing the error described above. Immediatly _after_ hyration, it will render the previously "hidden" content, so that the `<portal-target>` will render its content. Usually the user can hardly notice this as the update is near-immediate.

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
