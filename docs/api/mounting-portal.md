---
sidebar: auto
prev: ./portal-target
next: ./wormhole
---

# MountingPortal

This component extends the behaviour of a normal `<Portal>` by also mounting a `<PortalTarget>` to a DOM Element that the developer specifics with a _selector string_. (i.e. `#target-id`).

It also makes sure to clean up and remove the `<PortalTarget>` when it's being destroyed.

Appart from that, this component behaves like a normal `<Portal>` - but to make the previously described behaviour work, a few additional props exist.

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

### bail

| Type      | Required | Default |
| --------- | -------- | ------- |
| `Boolean` | yes      | `false` |

If a [`name`](#name) for the Target was given, you can come across duplicates. If a Target with that name already exists, `MountingPortal` will usually re-use the already existing Target instead of mounting a new one.

This mis generally advantagous as you if you intend to send content from multiple sources to the same target and can't be sure if the shared `<PortalTarget>` already exists.

However, if you set the `bail` prop, the component will not re-use an already existing target and instead abort and log a warning to the console.

:::warning
That might lead to some unpredictable behaviour, use at your own risk
:::

### mountTo

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | yes      | `false` |

A querySelector String defining the DOM element to mount the `<PortalTarget>` to.

## Portal Props

All Props from [`<Portal>`](./portal.md) work as well.

## PortalTarget Props

You can also define all props for the `<PortalTarget>` on the `<MountingPortal>`, but a few changes were necessary to avoid collitions with props from `<Portal>`:

- `name` is not used, instead use `to`
- `tag` is called `targetTag`
- `slotProps` is called `targetSlotProps`

Props working the same:

- `multiple`
- `transition`
- `transitionGroup`

## Slots

This component expects to receive a default scoped slot. If it's not passed, an an error will be logged

### `manual`

#### `to` (prop)

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | yes      |         |

If you don't want to have `<MountingPortal>` create the portal for you, you can instead pass it a scopedSlot named `manual` which will receive the `to` name for the created `<PortalTarget>`, so you can set up the `<Portal>` yourself however you please.

```html
<MountingPortal mountTo="#target-id">
  <div slot="manual" slot-scope="{to}" class="some-styles">
    <portal :to="to"> </portal>
  </div>
</MountingPortal>
```
