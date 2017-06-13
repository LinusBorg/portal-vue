# Known Caveats

Admittedly, portal-vue does a little bit of trickery to do what it does. With this come some caveats, which are documented below.

## Abstract components

`Portal` and `PortalTarget` are abstract components, which was necessary to make `$parent` work in the slot content as if the portal
did not exist, and keep pointing to the parent component of the portal.

That means they behave a bit differently in two ways:

1. They don't show up in vue-devtools.
2. they don't show up in `$children` but components in the portal's content will.

## Server-Side Rendering

When you [Vue's SSR capabilities](https://ssr.vuejs.org), there currently are some restrictions as well:

1. Order of components

  The `PortalTarget` has to appear **after** the **Portal** component in the document flow.
  The reason is that Vue renders the result of the first render to a string immediatly - so any changes that are triggered in a `PortalTarget`
  after it has been initially rendered will not appear in the HTML document that is sent to the user's browser - but they will appear after hydration,
  which will make Vue bail the hydration phase because it didn't find the HTML that it expected, and re-render the whole app.

2. targetEl  cannot be a real HTMLElement

  See the <a href="#" router-link="/docs/portal#targetel">Portal</a> documentation for details

<p class="tip">We are working on a proper solution to this problem. Stay tuned!</p>
