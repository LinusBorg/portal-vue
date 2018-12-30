# Wormhole Object

The Wormhole is not a component, it's an object that connects the `Portal`s to their `PortalTarget`s.

You can use this object to programmatically send content to a `PortalTarget`,
check weither a target exists, has content, and where that content was sent from.

<p class="tip">This feature was introduced with version `1.1.0`</p>

## Methods

### open()

The `open` method accepts one argument, an object with the following properties:

`Wormhole.open({to, from, passengers})`

| Property   | Required | Default | Explanation                                                       |
| ---------- | -------- | ------- | ----------------------------------------------------------------- |
| to         | yes      |         | The name of the `PortalTarget` to send to                         |
| from       | yes      |         | The name of the `Portal` this content comes from.                 |
| passengers | no       |         | An array of vNodes - the content to be sent to the `PortalTarget` |

Even if you use this method programmatically and there is not source `Portal`, you still have to provide `from` - every content sent through the wormhole needs a source.

Examples:

```javascript
import PortalVue from 'portal-vue'

const Wormhole = PortalVue.Wormhole

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

```html
<portal to="destination" name="my-portal">
  <p>This will be displayed in the Target!</p>
</portal>
```

### close()

As the name suggests, this is the counterpart to `open()`. It's used to remove content from a `PortalTarget`.

It accepts two arguments, an object and an optional `force` flag.

`Wormhole.close({ to, from }, force = false)`

| Argument/Property | Required | Default | Explanation                                                                                      |
| ----------------- | -------- | ------- | ------------------------------------------------------------------------------------------------ |
| to                | yes      |         | The name of the `PortalTarget` whose content should be removed                                   |
| from              | no       |         | Name of the Portal that the content was created with. Can be left out if the `force` flag is set |
| force             | no       | false   | If this is true, the `PortalTarget`s content will be removed even if `from` doesn't match        |

Why do you have to provide the `from` name (or use `force`)?

The close() method is also used by `Portal` components to remove the content from a `PortalTarget` when the `Portal` is being destroyed. But that should only remove the content if it still actually is the content from that `Portal`. If another `Portal` have overridden our content before the first one gets destroyed, we have to keep the content instead of removing it.

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

## hasTarget()

`Wormhole.hasTarget(to)`

Returns `true` if there's a `PortalTarget` with the given name active.

Example:

```javascript
Wormhole.hasTarget('destination')
// => true
```

### hasContentFor()

Returns `true` if there's a `PortalTarget` with the given name active, **and** there's content shown by the `PortalTarget`.

Example:

```javascript
Wormhole.hasContentFor('destination')
// => true
```

### getSourceFor()

`Wormhole.getSourceFor(to)`

Returns the name of the source that sent the current content to the given target. Returns `undefined` if no content/source exists.

```javascript
Wormhole.getSourceFor('destination')
// => 'my-portal'
```

### getContentFor()

`Wormhole.getContentFor(to)`

Returns the content that is currently being displayed in a `PortalTarget` with the given `to` name.

Example:

```javascript
Wormhole.getContentFor('destination')
// => Array<VNode>
```
