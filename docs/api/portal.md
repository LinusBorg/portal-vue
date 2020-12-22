---
sidebar: auto
prev: false
next: ./portal-target
---

# Portal Component

Wrap any content that you want to render somewhere else in a `<Portal>` component.

## Example usage

```html
<portal
  to="nameOfDestination"
  tag="span"
  :disabled="isDisabled"
>
  <p>This content will be sent through the portal</p>
</portal>
```

## Props API

### `disabled`

| Type      | Required | Default |
| --------- | -------- | ------- |
| `Boolean` | no       | `false` |

When `true`, the slot content will _not_ be sent through the portal to the defined PortalTarget.

Instead, it will be rendered in place:

**Source**

<!-- prettier-ignore -->
```html
<portal :disabled="true">
  <p>some content</p> 
</portal>
```

**Result**

<!-- prettier-ignore -->
```html
<p>some content</p>
```

::: tip Fragment

`Portal` now renders a fragment, which means it doesn't render a root node around its content. Thats a new features supported in Vue 3, and pretty useful here - no superfluous wrapper element anoymore!

::::

::: warning Local component state
 
 When toggling between enabled/disabled state, components in the portal slot are destroyed and re-created, which means any changes to their local state are lost.</p>

:::
### `name`

| Type     | Required | Default         |
| -------- | -------- | --------------- |
| `String` | no       | a random String |

This optional prop can usually be left out, because `<Portal>` can generate a random string to provide an identifier for the source of the content being sent to the `<PortalTarget>`.

But it might be a good idea to name your `<Portal>` components so you can debug them easier if need would be.

### `order`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `Number` | no\*     | 0       |

This prop defines the order position in the output of the `<PortalTarget>`.

::: tip
This prop is only useful when the Portal is sending content to a `<PortalTarget>` which has the `multiple` prop set.
:::

**Source**

<!-- prettier-ignore -->
```html
<portal name="destination" :order="2"> <p>some content</p> </portal>
<portal name="destination" :order="1"> <p>some other content</p> </portal>

<portal-target name="destination" multiple />
```

**Result**

<!-- prettier-ignore -->
```html
<p>some other content</p>
<p>some content</p>
```

### `slotProps`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `Object` | no       | `{}`    |

This prop is only useful if:

- the `disabled` prop is `true`, **and**
- the `<Portal>`'s slot content is a [Scoped Slot](https://vuejs.org/v2/guide/components.html#Scoped-Slots).

If that's the case, then the object you pass to `slotProps` is used to define the props that are passed to the scoped slot to display the content correctly in-place:

It has a (more useful) counterpart in the `<portal-target>` component

**Source**

<!-- prettier-ignore -->
```html
<portal 
  to="destination"
  disabled
  :slot-props="{state: 'disabled!'}"
  v-slot="props"
>
  <p>This scoped slot content is {{ props.state }}</p>
</portal>
```

**Result**

<!-- prettier-ignore -->
```html
<p>This scoped slot content is disabled!</p>
```

### `to`

| Type     | Required  | Default         |
| -------- | --------- | --------------- |
| `String` | yes       | a random String |

This defines the name of the `<PortalTarget>` component that the slot content should be rendered in.

**Source**

<!-- prettier-ignore -->
```html
<portal to="destination">
  <p>some content</p>
</portal>

<div class="target">
  <portal-target name="destination" />
</div>
```

**Result**

<!-- prettier-ignore -->
```html
<!-- the <portal> renders nothing -->

<div class="target">
  <p>some content</p>
</div>
```
