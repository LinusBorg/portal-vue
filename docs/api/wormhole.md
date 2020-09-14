---
sidebar: auto
prev: ./mounting-portal
next: false
---

# Wormhole Object

The Wormhole is not a component, it's an object that connects the `<Portal>`s to their `<PortalTarget>`s.

Usually, you will never need to use this object, but you _can_ use this object to programmatically send content to a `<PortalTarget>`, check whether a target exists, and other stuff.

:::warning Public API
The wormhole object exposes quite a few properties and methods. With regard to semver, only the properties and methods documented below are considered part of the public API.

Use any other properties at your own risk.
:::

## Methods

### open()

The `open` method accepts one argument, an object with the following properties:

`Wormhole.open({to, from, passengers})`

| Property   | Required | Default  | Explanation                                                         |
| ---------- | -------- | -------- | ------------------------------------------------------------------- |
| to         | yes      |          | The name of the `<PortalTarget>` to send to                         |
| from       | yes      |          | The name of the `<Portal>` this content comes from.                 |
| passengers | yes      |          | An array of vNodes - the content to be sent to the `<PortalTarget>` |
| order      | no       | Infinity | a number indicating the order when multipe sources for a target are used |

Even if you use this method programmatically and there is not source `<Portal>`, you still have to provide `from` - every content sent through the wormhole needs a source.

Examples:

```javascript
import { Wormhole } from 'portal-vue'

methods: {
  sendToPortalTarget() {
    const passengers = [this.$createElement('p', 'This will be displayed in the Target!')]
    Wormhole.open({
      to: 'destination',
      from: 'my-portal',
      passengers,
    })
  }
}
```

This is the programmatic equivalent of the following:

<!-- prettier-ignore -->
```html
<portal to="destination" name="my-portal">
  <p>This will be displayed in the Target!</p>
</portal>
```

::: tip Server-Side Rendering
For the reasons layed out in [the section about SSR](../guide/SSR.md), this method won't do anything during Server-Side Rendering. Portal'ing of the content will only happen on the client.
Make sure to Read the linked section for more information.
:::

### close()

As the name suggests, this is the counterpart to `open()`. It's used to remove content from a `<PortalTarget>`.

It accepts two arguments, an object and an optional `force` flag.

`Wormhole.close({ to, from }, force = false)`

| Argument/Property | Required | Default | Explanation                                                                                      |
| ----------------- | -------- | ------- | ------------------------------------------------------------------------------------------------ |
| to                | yes      |         | The name of the `<PortalTarget>` whose content should be removed                                 |
| from              | no       |         | Name of the Portal that the content was created with. Can be left out if the `force` flag is set |
| force             | no       | false   | If this is true, the `<PortalTarget>`s content will be removed even if `from` doesn't match      |

Why do you have to provide the `from` name (or use `force`)?

The close() method is also used by `<Portal>` components to remove the content from a `<PortalTarget>` when the `<Portal>` is being destroyed. But that should only remove the content if it still actually is the content from that `<Portal>`. If another `<Portal>` have overridden our content before the first one gets destroyed, we have to keep the content instead of removing it.

We can override this behaviour with the `force` argument.

Example:

```javascript
methods: {
  clearPortalTarget() {
    Wormhole.close({
      to: 'destination',
      from: 'my-programmatic-portal'
    })

    // Variation with `force`
    Wormhole.close({
      to: 'destination',
    }, true)

    // if the `from` doesn't match the source the content
    // was sent from, close() will fail silently
    // IF the current content is from 'my-other-portal', then:
    Wormhole.close({
      to: 'destination',
      from: 'my-portal',
    })
    // => this will not remove any content, it will stay in the PortalTarget
  }
}
```

### hasSource() <Badge text="2.0.0+"/>

`Wormhole.hasSource(from)`

Returns `true` if there's a `<Portal>` with the given name active.

Example:

```javascript
Wormhole.hasSource('origin')
// => true/false
```

::: tip Server-Side Rendering
For the reasons layed out in [the section about SSR](../guide/SSR.md), this method will always return `false` during Server-Side Rendering.
Make sure to Read the linked section for more information.
:::

### hasTarget() <Badge text="changed in 2.0.0" type=warning />

`Wormhole.hasTarget(to)`

Returns `true` if there's a `<PortalTarget>` with the given name active.

Example:

```javascript
Wormhole.hasTarget('destination')
// => true/false
```

::: tip Server-Side Rendering
For the reasons layed out in [the section about SSR](../guide/SSR.md), this method will always return `false` during Server-Side Rendering.
Make sure to Read the linked section for more information.
:::

### hasContentFor() <Badge text="changed in 2.1.0" type=warning />

`Wormhole.hasContentFor(to)`

Returns `true` if there's a `<PortalTarget>` with a name of `to` _and_ it currently has content to show.

Example:

```javascript
Wormhole.hasContentFor('destination')
// => true/false
```

::: tip Server-Side Rendering
For the reasons layed out in [the section about SSR](../guide/SSR.md), this method will always return `false` during Server-Side Rendering.
Make sure to Read the linked section for more information.
:::
