#Known Caveats

Admittedly, portal-vue does a little bit of trickery to do what it does. With this come some caveats, which are documented below.

## Abstract components

`Portal` and `PortalTarget` are abstract components, which was necessary to make `$parent` work in the slot content as if the portal
did not exist, and keep pointing to the parent component of the portal.

That means they behave a bit differently in two ways:

1. They don't show up in devtools.
2. they don't show up in `$children`

## Server-Side Rendering

When you Vue [Vue's SSR capabilities](https://ssr.vuejs.org), there are some restrictions as well:

1. Order of components

  The `PortalTarget` has to appear **after** the **Portal** component in the document flow.
  The reason is that Vue renders the result of the first render to a string immediatly - so any changes that are triggered in a `PortalTarget`
  after it has been initially rendered will not appear in the HTML document that is sent to the user's browser - but they will appear after hydration,
  which will make Vue bail the hydration phase because it didn't find the HTML that it expected, and re-render the whole app.

2. targetEl  cannot be a real HTMLElement

  See the <a href="#" router-link="/docs/portal#targetel">Portal</a> documentation for details

## Refs

The internal mechanism which sends updates from `Portals` to `PortalTargets` is asynchrnoues at the moment, to avoid some race conditions.

Unfortunately, this means that `$refs` that you might have added to a `Portal's` slot content will not be available on the next Tick, but only the one after that.

So you have to use a workaround for now:
```javascript
// Option 1: Two nested $nextTick calls
this.$nextTick(() => {
  this.$nextTick(() => {
    console.log(this.$refs.text)
  })
})

// Option 2: setTimeout
setTimeout(() => {
  console.log(this.$refs.text)
}, 0)
```
