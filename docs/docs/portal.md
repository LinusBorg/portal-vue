# <portal>

## Description

Wrap any content that you want to render somehwere else in a `<portal>` component.

## Example usage

```html
<portal to="nameOfDestination" tag="span" target-el="#target" :disabled="isDisabled">
  <p>This coonent will be sent through the portal</p>
</portal>
```

## Props API

### disabled

|Type|Required|Default|
|----|--------|-------|
|`Boolean`|no|`false`|

When `true`, the slot content will *not* be send through the portal to the defined PortalTarget.

Instead, they will be rendered in place:
**Source**
```html
<div class="wrapper">
  <portal :disabled="true">
    <p>some content</p>
  </portal>
</div>
```
**Result**
```html
<div class="wrapper">
  <div class="vue-portal">
    <p>some content</p>
  </div>
</div>
```

### slim

|Type|Required|Default|
|----|--------|-------|
|`Boolean`|no|`false`|

When set to true, the component will check if the sent content has only one root node. If that is the case, the component will *not* render a root node of its own but instead just output the conent as-is.

<p class="warning">This prop only has an effect when the 'disabled' prop is set as well</p>

**Source**
```html
<portal to="destination" slim disabled>
  <p>Only one content element</p>
</portal>
```
**Result**
```html
<p>Only one content element</p>
```

### `tag`

|Type|Required|Default|
|----|--------|-------|
|`String`|no|`'DIV'`|

Defines the type of tag that should be rendered as a root element.

<p class="warning">This prop only works when the 'disabled' prop is true</p>

**Source**
```html
<portal :disabled="true" tag="span">
  <p>some content</p>
</portal>
```
**Result**
```html
<span class="vue-portal">
  <p>some content</p>
</span>
```

### `targetEl`

### `To`
|Type|Required|Default|
|----|--------|-------|
|`String`|yes|none|

Defines the name of the `<portal>` component that the slot contents should be sent to.
**Source**
```html
<portal to="destination">
  <p>some content</p>
</portal>

<div class="target">
 <portal-target name="destination" />
</div>

```
**Result**
```html
<div class="vue-portal"></div>

<div class="target">
  <div class="vue-portal-target">
    <p>some content</p>
  </div>
</div>
```
