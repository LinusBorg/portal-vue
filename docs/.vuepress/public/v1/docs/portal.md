# Portal Component

Wrap any content that you want to render somewhere else in a `<portal>` component.

## Example usage

```html
<portal to="nameOfDestination" tag="span" target-el="#target" :disabled="isDisabled">
  <p>This coonent will be sent through the portal</p>
</portal>
```

<p class="info">This is an abstract component which means it will not be visible in vue-devtools</p>

## Props API

### `disabled`

| Type      | Required | Default |
| --------- | -------- | ------- |
| `Boolean` | no       | `false` |

When `true`, the slot content will _not_ be send through the portal to the defined PortalTarget.

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

<p class="warning">When togling between enabled/disabled state, components in the portal slot are destroyed and re-created, which means any changes to their local state are lost.</p>

### `name`

| Type     | Required | Default         |
| -------- | -------- | --------------- |
| `String` | no       | a random String |

This optional prop can usually be left out, because `Portal` can generate a random string to provide an identifier for the source of the content being sent to the `PortalTarget`.

But it might be a good idea to name your `Portal` components so you can debug them easier if need would be.

### `order`

> since `1.2.0`

| Type              | Required | Default         |
| ----------------- | -------- | --------------- |
| `[String,Number]` | no\*     | a random String |

This prop defines the order position in the output of the `PortalTarget`.

<p class="tip">
  This prop is only useful when the Portal is sending content to a `PortalTarget` which has the `multiple` prop set.
</p>

**Source**

```html
<portal name="destination" :order="2">
  <p>some content</p>
</portal>
<portal name="destination" :order="1">
  <p>some other content</p>
</portal>

<portal-target name="destination" multiple />
```

**Result**

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

```html
<portal to="destination" slim disabled>
  <p>Only one content element</p>
</portal>
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

This prop is only useful if:

- the `disabled` prop is `true`, **and**
- the `Portal`'s slot content is a [Scoped Slot](https://vuejs.org/v2/guide/components.html#Scoped-Slots).

If that's the case, then the object you pass to `slotProps` is used to define the props that are passed to the scoped slot to display the content correctly in-place:

It has a (more useful) counterpart in the `<portal-target>` component

**Source**

```html
<portal to="destination" disabled slot-props="{state: 'disabled!'}">
  <p slot-scope="props">
    This scoped slot content is {{ props.state }}
  </p>
</portal>
```

**Result**

```html
<div class="vue-portal">
  <p>
    This scoped slot content is disabled
  </p>
</div>
```

### `tag`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | no       | `'DIV'` |

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

### `targetClass`

| Type     | Required | Default |
| -------- | -------- | ------- |
| `String` | no       | none    |

Accepts a string containing a list of classes. These classes will be applied to the root element of the `PortalTarget`.

**Source**

```html
<portal to="destination" target-class="class1 class2">
  <p>some content</p>
</portal>

<portal-target name="destination"></portal-target>
```

**Result**

```html
<div class="vue-portal"></div>

<div class="vue-portal-target class1 class2"
  <p>some content</p>
</div>
```

### `targetEl`

| Type                    | Required | Default |
| ----------------------- | -------- | ------- |
| `[String, HTMLElement]` | no       | none    |

<p class="tip">
  Type HTMElement is not allowed when using Vue SSR.
</p>

<p class="warning">
  <strong>Warning</strong><br>
  This feature might change in PortalVue 2.0. It's not clear at the moment if those changes will be breaking or not. See [this issue](https://github.com/LinusBorg/portal-vue/issues/74).
</p>

Defines the name of the `Portal` component that the slot contents should be sent to. This mounts a new instance of the
`PortalTarget` component.

<p class="warning">
  This feature should be used on elements <strong>outside</strong> of the scope of your Vue app,
  because it replaces the target element while mounting the Portal instance, which can lead to unwanted
  side effects in your Vue App.

You _can_ use it inside of the Vue-controlled part of your page, It works for the most part, but be warned that this is not thoroughly tested.

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

| Type     | Required                                | Default         |
| -------- | --------------------------------------- | --------------- |
| `String` | yes, unless `targetEl` prop is provided | a random String |

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
