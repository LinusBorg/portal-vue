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
</portal-targed>
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

## Slots API

### Default slot

Any existing slot content is rendered in case that no contnt from any source Portal is available.

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
|`pssengers`|`Array<VNode>`|An array of vnodes, the content that was sent to this `PortalTarget`|

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
