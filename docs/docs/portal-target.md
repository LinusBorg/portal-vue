# <portal-target>

## Description

This component is an outlet for any content that was sent by a `<portal>` component. It renders received content and doesn't do much else.

## Example usage

```html
<portal-target name="destination" />
```

## Props API

### name

|Type|Required|Default|
|----|--------|-------|
|`String`|yes|none|

Defines the name of this portal-target. `<portal>` components can send content to this instance by this name.

### slim

|Type|Required|Default|
|----|--------|-------|
|`Boolean`|no|`false`|

When set to true, the component will check if the sent content has only one root node. If that is the case, the component will *not* render a root node of its own but instead just output the conent as-is.

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

### tag

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
