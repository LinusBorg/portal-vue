# Portal Component

Wrap any content that you want to render somehwere else in a `<portal>` component.

## Example usage

```html
<portal to="nameOfDestination" tag="span" target-el="#target" :disabled="isDisabled">
  <p>This coonent will be sent through the portal</p>
</portal>
```

<p class="info">This is an avstract component which means it will not be visible in vue-devtools</p>

## Props API

### `disabled`

|Type|Required|Default|
|----|--------|-------|
|`Boolean`|no|`false`|

When `true`, the slot content will *not* be send through the portal to the defined PortalTarget.

Instead, it will be rendered in place:
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

### `name`

|Type|Required|Default|
|----|--------|-------|
|`String`|no|a random String|

This optional prop can usually be left out, because `Portal` can generate a random string to provide a identifier for the source of the content being sent to the `PortalTarget`.

But it might be a good idea to name your `Portal` components so you can debug them easier if need would be.



### `slim`

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

**Source**
```html
<portal disabled tag="span">
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

|Type|Required|Default|
|----|--------|-------|
|`[String, HTMLElement]`|no|none|

<p class="info">
  Type HTMElement is not allowed when using Vue SSR.
</p>

Defines the name of the `Portal` component that the slot contents should be sent to. This mounts a new instance of the
`PortalTarget` component.

<p class="warning">
  This feature should be used on elements <strong>outside</strong> of the scope of your Vue app,
  because it replaces the target element while mounting the Portal instance, which can lead to unwanted
  side effects in your Vue App.

  You *can* use it inside of the Vue-controlled part of your page, It works for the most part, but be warned that this is not thoroughly tested.
</p>

**Source**
```html
<portal to="destination" target-el="#render-here">
  <p>some content</p>
</portal>

<div id="render-here" class="someclass">
 <!-- nothing necessary here -->
</div>

```
**Result**
```html
<div class="vue-portal"></div>

<div id="render-here" class="someclass">
  <p>some content</p>
</div>

```

### `to`
|Type|Required|Default|
|----|--------|-------|
|`String`|yes, unless `targetEl` prop is provided|a random String|

This defines the name of the `PortalTarget` component that the slot content should be rendered in.

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
