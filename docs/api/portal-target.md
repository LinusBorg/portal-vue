---
sidebar: auto
prev: ./portal
next: ./mounting-portal
---

# PortalTarget

This component is an outlet for any content that was sent by a `<Portal>` component. It renders received content and doesn't do much else.

## Example usage

```html
<portal-target name="destination" />
```

<p class="info">This is an abstract component which means it will not be visible in vue-devtools</p>

## Props API

### `multiple` <Badge text="1.2.0+"/>

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
<div class="vue-portal-target">
  <p>some other content</p>
  <p>some content</p>
</div>
```

### `name`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | yes      | none    |

Defines the name of this portal-target. `<Portal>` components can send content to this instance by this name.

### `slim`

| Type      | Required | Default |
| --------- | -------- | ------- |
| `Boolean` | no       | `false` |

When set to true, the component will check if the sent content has only one root node. If that is the case, the component will _not_ render a root node of its own but instead just return that single node.

**Source**

<!-- prettier-ignore -->
```html {5}
<portal to="destination"> <p>Only one content element</p> </portal>

<portal-target name="destination" slim />
```

**Result**

<!-- prettier-ignore -->
```html
<p>Only one content element</p>
```

:::warning BREAKING CHANGE IN 2.0.0
When there's no content and `slim` is set, the target doesn't render an empty `<div>` anymore, it renders nothing (a comment node as a placeholder is rendered, to be precise).
:::

### `slotProps` <Badge text="1.3.0+"/>

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
<portal to="destination">
  <p slot-scope="props">This scoped slot content is so {{ props.state }}</p>
</portal>

<portal-target name="destination" slot-props="{state: 'cool!'}" />
```

**Result**

<!-- prettier-ignore -->
```html
<div class="vue-portal-target">
  <p>This scoped slot content is so cool!</p>
</div>
```

It has a counterpart of the same name on the `<Portal>` component to pass props to the slot content when the `<Portal>` is disabled.

### `tag`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | no       | `'DIV'` |

Defines the type of tag that should be rendered as a root component.

**Source**

<!-- prettier-ignore -->
```html {3}
<portal-target name="destination" tag="span" />
```

**Result**

<!-- prettier-ignore -->
```html {1}
<span class="vue-portal-target">
  <!-- any content from <Portal> component may be rendered here -->
</span>
```

### `transition` <Badge text=" changed in 2.0.0+"/>

| Type                    | Required | Default |
| ----------------------- | -------- | ------- |
| `Boolean|String|Object` | no       | none    |

This property is used to configure a transition for the portal content. By default, it will render
a `<transition-group>`, which will respect the `<PortalTarget>`'s [`tag`](#tag) property and will render instead of the
plain wrapper element that is usually rendered.

It accepts:

- a `String` value: will render `<transition-group>` with the `name` prop set to that string.
- a `Component`: will render `<transition-group>` with the object's content passed as props.

Example with string:

<!-- prettier-ignore -->
```html {4}
<portal-target
  name="dest" 
  slim
  transition="fade">
</portal-target>
```

Example with Component

<!-- prettier-ignore -->
```html
<portal-target 
  name="dest" slim 
  :transition="fadeTransition">
</portal-target>
```

```javascript
computed: {
  fadeTransition() {
    return {
      functional: true,
      render(h) {
        h('transition', { name: 'fade', mode: 'out-in' })
      }
    }
  },
  globalTransitionComponent() {
    // instead of creating the Transition component locally like above,
    // you probably would like to re-use a component, that you registered
    // either globally or locally.
    return Vue.component('yourGloballyregisteredComponent')
    // or
    return this.$options.components('yourLocallyregisteredComponent')
  }
}
```

#### Slim Mode

When [`slim`](#slim) is also specified, it will render a `<transition>` instead of a `<transition-group>`.

You can use the `transitionEvents` prop to pass event listeners for that transition.

### `transitionEvents` <Badge text="removed in 2.0.0" type="error"/>

| Type     | Required | Default |
| -------- | -------- | ------- |
| `Object` | no       | none    |

 <p class="info">This property requires that the `transition` prop is defined as well.</p>

Accepts an object whose keys match the transition component's events. Each key's value should be a callback function for the transition.

<!-- prettier-ignore -->
```html {4}
<portal-target
  name="dest"
  transition="fade"
  :transition-events="{ enter: handleEnter, leave: handleLeave }"
></portal-target>
```

## Slots API

### Default slot <Badge text="1.1.0+"/>

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
<span class="vue-portal-target">
  <p>This is rendered when no other content is available.</p>
</span>
```

### Default scoped slot <Badge text="2.0.0+"/>

If a scoped slot is provided, its content is rendered in case that no content from any source Portal is available. The scoped slot receives the [`slotProps`](#slotprops) prop as its argument.

Example:

**Source**

<!-- prettier-ignore -->
```html {1-3}
<portal-target name="destination" :slotScope="{ message: 'Hi!' }">
  <p slot-scope="props">
    {{props.mesage}} This is rendered when no other content is available.
  </p>
</portal-target>
```

**Result**

<!-- prettier-ignore -->
```html
<div class="vue-portal-target">
  <p>This is rendered when no other content is available.</p>
</div>
```

## Events API <Badge text="1.1.0+" type="warning"/>

### `change`

Emitted everytime the component re-renders because the content from the `<Portal>` changed.

It receives two arguments, each is a `Boolean`, indicating the absense or presence of content for the target.

The first argument is represents the current contents, the second one the previous contents (just like the arguments of a `watch` handler in a Vue component)

<!-- prettier-ignore -->
```html {4}
<template>
  <portal-target name="destination" @change="handleUpdate" />
</template>

<script>
  export default {
    methods: {
      handleUpdate(newContent, oldContent) {
        // do something with the info.
      },
    },
  }
</script>
```

:::warning BREAKING CHANGE in 2.0.0
The event now is simple `Boolean` values, indicating wether the target is/was empty or not.

Previously, we emitted the old and new contents, but that code was too cumbersome for little value.
:::
