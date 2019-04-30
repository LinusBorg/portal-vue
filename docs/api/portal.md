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
  target-el="#target"
  :disabled="isDisabled"
>
  <p>This coonent will be sent through the portal</p>
</portal>
```

## Props API

### `disabled`

| Type      | Required | Default |
| --------- | -------- | ------- |
| `Boolean` | no       | `false` |

When `true`, the slot content will _not_ be send through the portal to the defined PortalTarget.

Instead, it will be rendered in place:

**Source**

<!-- prettier-ignore -->
```html
<div class="wrapper">
  <portal :disabled="true">
    <p>some content</p> 
  </portal>
</div>
```

**Result**

<!-- prettier-ignore -->
```html
<div class="wrapper">
  <div class="vue-portal">
    <p>some content</p>
  </div>
</div>
```

<p class="warning">When toggling between enabled/disabled state, components in the portal slot are destroyed and re-created, which means any changes to their local state are lost.</p>

### `name`

| Type     | Required | Default         |
| -------- | -------- | --------------- |
| `String` | no       | a random String |

This optional prop can usually be left out, because `<Portal>` can generate a random string to provide an identifier for the source of the content being sent to the `<PortalTarget>`.

But it might be a good idea to name your `<Portal>` components so you can debug them easier if need would be.

### `order` <Badge text="1.2.0+"/>

| Type              | Required | Default         |
| ----------------- | -------- | --------------- |
| `[String,Number]` | no\*     | a random String |

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
<div class="vue-portal-target">
  <p>some other content</p>
  <p>some content</p>
</div>
```

### `slim`

| Type      | Required | Default |
| --------- | -------- | ------- |
| `Boolean` | no       | `false` |

When set to true, the component will check if the sent content has only one root node. If that is the case, the component will _not_ render a root node of its own but instead just output the content as-is.

<p class="tip">This prop only has an effect when the 'disabled' prop is set as well</p>

**Source**

<!-- prettier-ignore -->
```html
<portal to="destination" slim disabled>
  <p>Only one content element</p>
</portal>
```

**Result**

```html
<p>Only one content element</p>
```

:::warning BREAKING CHANGE IN 2.0.0
When there's no content and `slim` is set, the portal doesn't render an empty `<div>` placeholder anymore, it renders nothing (a comment node as a placeholder is rendered, to be precise).
:::

### `slotProps` <Badge text="1.3.0+"/>

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
<portal to="destination" disabled slot-props="{state: 'disabled!'}">
  <p slot-scope="props">This scoped slot content is {{ props.state }}</p>
</portal>
```

**Result**

<!-- prettier-ignore -->
```html
<div class="vue-portal"><p>This scoped slot content is disabled</p></div>
```

### `tag`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | no       | `'DIV'` |

Defines the type of tag that should be rendered as a root element.

**Source**

<!-- prettier-ignore -->
```html
<portal disabled tag="span">
  <p>some content</p>
</portal>
```

**Result**

<!-- prettier-ignore -->
```html
<span class="vue-portal"> 
  <p>some content</p> 
</span>
```

### `targetClass` <Badge text="removed in 2.0.0" type="error"/>

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | no       | none    |

Accepts a string containing a list of classes. These classes will be applied to the root element of the `<PortalTarget>`.

**Source**

<!-- prettier-ignore -->
```html
<portal to="destination" target-class="class1 class2">
  <p>some content</p>
</portal>

<portal-target name="destination"></portal-target>
```

**Result**

<!-- prettier-ignore -->
```html
<div class="vue-portal"></div>

<div class="vue-portal-target class1 class2"
  <p>some content</p>
</div>
```

### `targetEl` <Badge text="removed in 2.0.0" type="error"/>

This prop has been removed in favour of the new [`<MountingPortal>` component](./mounting-portal.md).

[You can find infos about this prop in the v1 docs](https://v1.portal-vue.linusb.org/#/docs/portal#targetel)

### `to`

| Type     | Required                                | Default         |
| -------- | --------------------------------------- | --------------- |
| `String` | yes, unless `targetEl` prop is provided | a random String |

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
<div class="vue-portal"></div>

<div class="target">
  <div class="vue-portal-target">
    <p>some content</p>
  </div>
</div>
```
