---
sidebar: auto
prev: ./portal-target
next: ./wormhole
---

# MountingPortal

This component's job is to mount a `<PortalTarget>` to a DOM Element outside of the DOM. That Element is defined with a Selector String (i.e. `#target-id`).

The Provider then makes the (dynamically generated) name available to a Portal through its scoped slot.

It also makes sure to clean up and remove the `<PortalTarget>` when it's being destroyed.

## Example Usage

```html {}
<MountingPortal mountTo="#targetId" append>
  <portal slot-scope="{to}" :to="to" name="source">
    <p>This is the content for the portal</p>
  </portal>
</MountingPortal>
```

## Props

:::warning
All of these props are _not_ dynamic. That means changing their values after initial render will have no effect.
:::

### append

| Type               | Required | Default |
| ------------------ | -------- | ------- |
| `Boolean`/`String` | no       | `false` |

If `true`, a `<div>` will be appended to the target element defined by [`mountTo`](#mountto) and the `<PortalTarget>` will be mounted to this new child element.

`append` can also be a string, in which case it's assumed to be a valid HTMLElement name, and the element that's created won't be a `<div>` but instead whatever that string defines (i.e. `''span'`). PAssing a component name will _not_ work.

### force

| Type      | Required | Default |
| --------- | -------- | ------- |
| `Boolean` | yes      | `false` |

If a [`name`](#name) for the Target was given, you can come across duplicates. If a Target with that name already exists, `MountingPortal` will re-use the already existing Target instead of mounting a new one.

This may not be a problem if you intend to send content from multiple sources and can't be sure if the shared PortalTarget already exists.

If you want to replace the existing Target, you can set the `force` prop to force a fresh mount of the target to the element that you specified.

:::warning
That might lead to some unpredictable behaviour, use at your own risk
:::

### mountTo

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | yes      | `false` |

A querySelector String defining the DOM element to mount the `<PortalTarget>` to.

### name

| Type     | Required | Default                  |
| -------- | -------- | ------------------------ |
| `String` | no       | an auto-generated string |

If not defined, the Provider will auto-generate a name for the `<PortalTarget>` that is created.

With this prop you can set it yourself.

## Other Attributes

Any attributes on the Provider besides the props defined above will be set on the <PortalTarget/>.

Notable exeptions (sadly) are `class` and `style` which get specil internal treatment by Vue and can't be passed along that easily.

## Slots

This component expects to receive a default scoped slot. If it's not passed, an an error will be logged

### Default scoped slot

#### `to` (prop)

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | yes      |         |
