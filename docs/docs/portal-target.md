# PortalTarget

This component is an outlet for any content that was sent by a `<portal>` component. It renders received content and doesn't do much else.

## Example usage

```html
<portal-target name="destination" />
```

<p class="info">This is an avstract component which means it will not be visible in vue-devtools</p>

## Props API

### `name`

|Type|Required|Default|
|----|--------|-------|
|`String`|yes|none|

Defines the name of this portal-target. `<portal>` components can send content to this instance by this name.

### `slim`

|Type|Required|Default|
|----|--------|-------|
|`Boolean`|no|`false`|

When set to true, the component will check if the sent content has only one root node. If that is the case, the component will *not* render a root node of its own but instead just return that single node.

**Source**
```html
<portal to="destination">
  <p>Only one content element</p>
</portal>

<portal-target name="destination" slim>
</portal-target>
```
**Result**
```html
<p>Only one content element</p>
```

### `tag`

|Type|Required|Default|
|----|--------|-------|
|`String`|no|`'DIV'`|

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
|Type|Required|Default|
|----|--------|-------|
|`Boolean|String|Object`|no| none |

This property is used to configure a transition for the portal content. By default, it will render
a `<transition-group>`, which will respect the `PortalTarget`'s [`tag`](#tag) property and will render instead of the 
plain wrapper element that is usually rendered.

It accepts:

* a `Boolean` value: will render `<transition-group>` without any options
* a `String` value: will render  `<transition-group>` with the `name` prop set to that string.
* an `Object`: will render `<transition-group>` with the object's content passed as props.


Its content should mimic the props interface of Vue's `<transition>` component, e.g.:

```html
<portal-target name="dest" slim :transition="{name: 'fade', mode: 'out-in'}">
```

#### Slim Mode

When [`slim`](#slim) is also specified, it will render a `<transition>` instead of a `<transition-group>`.

You can use the `transitionEvents` prop to pass event listeners for that transition.

 ### `transitionEvents`

|Type|Required|Default|
|----|--------|-------|
|`Object`|no| none |

 <p class="info">This property requires that the `transition` prop is defined as well.</p>

Accepts an object whose keys match the transition component's events. Each key's value should be a callback function for the transition.
```html
<portal-target 
  name="dest" 
  :transition="{name: 'fade'}"
  :transition-events="{ enter: handleEnter, leave: handleLeave }">
```

## Slots API

### Default slot

Any existing slot content is rendered in case that no content from any source Portal is available.

Example:
**Source**
```html
<portal-target name="destination" tag="span">
  <p>This is rendered when no other content is avaiable.</p>
</portal-target>
```

**Result**
```html
<span class="vue-portal-target">
  <p>This is rendered when no other content is avaiable.</p>
</span>
```

## Events API

### `change`

Emitted everytime the component re-renders because the content from the `Portal` changed.

it recives two arguments, each is an object with the following properties:

|Property|Type|Description|
|--------|----|-----------|
|`from`|`String`|Name of the source `Portal` that the content was sent from|
|`passengers`|`Array<VNode>`|An array of vnodes, the content that was sent to this `PortalTarget`|

The first object represents the new conent, the second one the old content.

```html
<template>
  <portal-target name="destination" @change="handleUpdate"/>
</template>

<script>
export default {
  methods: {
    handleUpdate({ from, passengers }, { from: oldFrom, passengers: newPassengers }) {
      if (from !== oldFrom) {
        console.log('This new content is from a different <Portal>!')
      } 
    }
  }
}
</script>
```
