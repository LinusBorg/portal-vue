---
# sidebar: auto
prev: ./portal
next: ./mounting-portal
---

# PortalTarget

This component is an outlet for any content that was sent by a `<Portal>` component. It renders received content and doesn't do much else.

## Example usage

```html
<portal-target name="destination" />
```

::: tip Fragment

  `PortalTarget` renders a Fragment now, which means: there is no wrapping element.

:::

## Props API

### `multiple`

When `multiple` is `true`, the portal will be able to receive and render content from multiple `<Portal>` component at the same time.

You should use the `order` prop on the `<Portal>` to define the order in which the contents should be rendered:

**Source**

<!-- prettier-ignore -->
```html {10}
<portal to="destination" :order="2">
  <p>some content</p>
</portal>
<portal to="destination" :order="1">
  <p>some other content</p>
</portal>

<portal-target name="destination" multiple />
```

**Result**

<!-- prettier-ignore -->
```html
<p>some other content</p>
<p>some content</p>
```

### `name`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | yes      | none    |

Defines the name of this portal-target. `<Portal>` components can send content to this instance by this name.

### `slotProps`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `Object` | no       | `{}`    |

::: tip
This prop is only useful when the PortalTarget received content from a [scoped Slot](https://vuejs.org/v2/guide/components.html#Scoped-Slots) of a `<Portal>`.
:::

The `slotProps` object is used as props to render the scoped slot from a `<Portal>`.

**Source**

<!-- prettier-ignore -->
```html {2,9}
<portal to="destination" v-slot="props" slot-props="{ state: 'nice!!' }">
  <p>This scoped slot content is so {{ props.state }}</p>
</portal>

<portal-target name="destination" slot-props="{state: 'cool!'}" />
```

**Result**

<!-- prettier-ignore -->
```html
<p>This scoped slot content is so cool!</p>
```

It has a counterpart of the same name on the `<Portal>` component to pass props to the slot content when the `<Portal>` is disabled.

## Slots API

### Default slot

Any existing slot content is rendered in case that no content from any source Portal is available.

Example:

**Source**

<!-- prettier-ignore -->
```html {2}
<portal-target name="destination" tag="span">
  <p>This is rendered when no other content is available.</p>
</portal-target>
```

**Result**

<!-- prettier-ignore -->
```html
<p>This is rendered when no other content is available.</p>
```

### Default scoped slot

The default slot can also be scoped. The scoped slot receives the [`slotProps`](#slotprops) prop as its argument.

Example:

**Source**

<!-- prettier-ignore -->
```html {1-3}
<portal-target name="target" :slotScope="{ message: 'Hi!' }" v-slot="props">
  <p>
    {{props.message}} This is rendered when no other content is available.
  </p>
</portal-target>
```

**Result**

<!-- prettier-ignore -->
```html
<p>This is rendered when no other content is available.</p>
```

### `v-slot:sourceWrapper`

This Slot allows to wrap each individual item from a portal (or `multiple` portals) in additional markup. The slot receives an array of `VNodes`:

```html
<portal to="wrapped-target">
  <p>Some inline content</p>
  <p>Some more content</p>
</portal>

<portal to="wrapped-target">
  <p>Some content from a second portal</p>
</portal>

<div class="flex">
  <portal-vue to="wrapped-target" multiple>
    <template v-slot:item-wrapper="nodes">
      <div class="flex-item">
        <component v-for="node in nodes" :is="node" />
      </div>
    </template>
  </portal-vue>
</div>
```

**Result**

```html
<div class="flex">
  <div class="flex-item"> <!-- content from first portal wrapped together -->
    <p>Some inline content</p>
    <p>Some more content</p>
  </div>
  <div class="flex-item"> <!-- content from second portal in a second wrapper -->
    <p>Some content from a second portal</p>
  </div>
    
</div>
```

### `v-slot:itemWrapper`

This slot can be used to define markup that should wrap the content received from a `<portal>`. This is usually only useful in combination with [`multiple`](#multiple), as for content from a single portal, you can just wrap the `<portal-target>` as a whole.

The slot receives a single vnode as its only prop. These vnodes can be rendered with Vue's dynamic component syntax:

`<component :is="node">`

```html
<portal to="wrapped-target">
  <p>Some inline content</p>
  <p>Some more content</p>
</portal>

<portal to="wrapped-target">
  <p>Some content from a second portal</p>
</portal>

<div class="flex">
  <portal-vue to="wrapped-target" multiple>
    <template v-slot:item-wrapper="node">
      <div class="flex-item"> <!-- will be applied around each individual <p> !! -->
        <component :is="node" />
      </div>
    </template>
  </portal-vue>
</div>
```

**Result**

```html
<div class="flex">
  <div class="flex-item">
    <p>Some inline content</p>
  </div>
  <div class="flex-item">
    <p>Some more content</p>
  </div>
  <div class="flex-item">
    <p>Some content from a second portal</p>
  </div>
    
</div>
```

### `v-slot:outerWrapper`

This slot is similar to `itemWrapper`, but it will be called only once, and receive *all* vnodes in an array. That allows you to wrap all received content in a shared wrapper element.

Usually, this slot is not very useful as you can instead just put the wrapper around the `<portal-target>`itself. But it's useful for transition groups which would otherwie conflict with the `<portal-target>`'s own root element:

```html
<portal-target name="wrapped-with-transition-group" multiple>
  <template v-slot:outer-wrapper="{ nodes }">
    <transition-group name="fade">
      <component v-for="node in nodes" :is="node">
    </transition-group
  </template>
</portal-target>
```

### `v-slot:wrapper` <Badge type="warning">deprecated</Badge>

::: warn This feature is deprecated. Do not use.

This slot has been deprecated in version `3.1` when we introduced to additional slots, in order to provide more clarity in naming. Please use `v-slot:sourceWrapper` instead, which works 100% the same as `v-slot:wrapper` did - or check out the new `v-slot:sourceWrapper` and `v-slot:outerWrapper` slots.

:::

## Events API

### `change`

Emitted every time the component re-renders because the content from the `<Portal>` changed.

It receives an object with two properties:

```js
{
  hasContent: boolean,
  sources: string[]
}
```

|Property| type | description|
|----------|---------|-----------------------------------------------------------------------|
|hasContent|boolean  | indicated wether there is currently and content for the `PortalTarget`|
|sources   | string[]| Array with the names of the portal(s) that sent content               |

<!-- prettier-ignore -->
```html {4}
<template>
  <portal-target name="destination" @change="handleUpdate" />
</template>

<script>
  export default {
    methods: {
      handleUpdate({ hasChanged, sources }) {
        // do something with the info.
      },
    },
  }
</script>
```
