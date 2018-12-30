# PortalTarget

This component is an outlet for any content that was sent by a `<portal>` component. It renders received content and doesn't do much else.

## Example usage

```html
<portal-target name="destination" />
```

<p class="info">This is an abstract component which means it will not be visible in vue-devtools</p>

## Props API

### `multiple`

> since `1.2.0`

When `multiple` is `true`, the portal will be able to receive and render content from multiple `Portal` component at the same time.

You should use the `order` prop on the `Portal` to define the order in which the contents should be rendered:

**Source**

```html
<portal to="destination" :order="2"> <p>some content</p> </portal>
<portal to="destination" :order="1"> <p>some other content</p> </portal>

<portal-target name="destination" multiple />
```

**Result**

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

Defines the name of this portal-target. `<portal>` components can send content to this instance by this name.

### `slim`

| Type      | Required | Default |
| --------- | -------- | ------- |
| `Boolean` | no       | `false` |

When set to true, the component will check if the sent content has only one root node. If that is the case, the component will _not_ render a root node of its own but instead just return that single node.

**Source**

```html
<portal to="destination"> <p>Only one content element</p> </portal>

<portal-target name="destination" slim> </portal-target>
```

**Result**

```html
<p>Only one content element</p>
```

### `slotProps`

> since `1.3.0`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `Object` | no       | `{}`    |

<p class="tip">
  This prop is only useful when the PortalTarget received content from a [scoped Slot](https://vuejs.org/v2/guide/components.html#Scoped-Slots) of a `Portal`.
</p>

The `slotProps` object is used as props to render the scoped slot from a `<portal>`.

**Source**

```html
<portal to="destination">
  <p slot-scope="props">This scoped slot content is so {{ props.state }}</p>
</portal>

<portal-target name="destination" slot-props="{state: 'cool!'}" />
```

**Result**

```html
<div class="vue-portal-target"><p>This scoped slot content is so cool!</p></div>
```

It has a counterpart of the same name on the `<portal>` component to pass props to the slot content when the `<portal>` is disabled.

### `tag`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | no       | `'DIV'` |

Defines the type of tag that should be rendered as a root component.

**Source**

```html
<portal-target name="destination" tag="span" />
```

**Result**

```html
<span class="vue-portal-target">
  <!-- any content from <portal> component may be rendered here -->
</span>
```

### `transition`

> since `1.2.0`

| Type                    | Required | Default |
| ----------------------- | -------- | ------- |
| `Boolean|String|Object` | no       | none    |

This property is used to configure a transition for the portal content. By default, it will render
a `<transition-group>`, which will respect the `PortalTarget`'s [`tag`](#tag) property and will render instead of the
plain wrapper element that is usually rendered.

It accepts:

- a `Boolean` value: will render `<transition-group>` without any options
- a `String` value: will render `<transition-group>` with the `name` prop set to that string.
- an `Object`: will render `<transition-group>` with the object's content passed as props.

Its content should mimic the props interface of Vue's `<transition>` component, e.g.:

```html
<portal-target
  name="dest"
  slim
  :transition="{name: 'fade', mode: 'out-in'}"
></portal-target>
```

#### Slim Mode

When [`slim`](#slim) is also specified, it will render a `<transition>` instead of a `<transition-group>`.

You can use the `transitionEvents` prop to pass event listeners for that transition.

### `transitionEvents`

> since `1.2.0`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `Object` | no       | none    |

 <p class="info">This property requires that the `transition` prop is defined as well.</p>

Accepts an object whose keys match the transition component's events. Each key's value should be a callback function for the transition.

```html
<portal-target
  name="dest"
  :transition="{name: 'fade'}"
  :transition-events="{ enter: handleEnter, leave: handleLeave }"
></portal-target>
```

## Slots API

### Default slot

> since `1.1.0`

Any existing slot content is rendered in case that no content from any source Portal is available.

<p class="warning">
  Elements in the default slot should be properly keyed in order to prevent render update mistakes in some limited edge cases
</p>

Example:

**Source**

```html
<portal-target name="destination" tag="span">
  <p :key="my-random-key">
    This is rendered when no other content is available.
  </p>
</portal-target>
```

**Result**

```html
<span class="vue-portal-target">
  <p>This is rendered when no other content is available.</p>
</span>
```

## Events API

> since `1.1.0`

### `change`

Emitted everytime the component re-renders because the content from the `Portal` changed.

it receives two arguments, each is an object with the following properties:

| Property     | Type           | Description                                                          |
| ------------ | -------------- | -------------------------------------------------------------------- |
| `from`       | `String`       | Name of the source `Portal` that the content was sent from           |
| `passengers` | `Array<VNode>` | An array of vnodes, the content that was sent to this `PortalTarget` |

The first object represents the new conent, the second one the old content.

```html
<template>
  <portal-target name="destination" @change="handleUpdate" />
</template>

<script>
  export default {
    methods: {
      handleUpdate(
        { from, passengers },
        { from: oldFrom, passengers: newPassengers }
      ) {
        if (from !== oldFrom) {
          console.log('This new content is from a different <Portal>!')
        }
      },
    },
  }
</script>
```
