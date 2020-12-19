---
sidebar: auto
prev: ./getting-started
next: ./caveats
---

# Advanced Usage

## Switching targets & sources

The `to` prop of `<portal>` and the `name` prop of `<portal-target>` can be changed dynamically with `v-bind`, allowing you to send content of one `<portal>` to a different `<portal-target>`, or switch the source of a `<portal-target>` from one `<portal>` to another.

<!-- prettier-ignore -->
```html
<portal v-bind:to="name">
  Content will be dynamically sent to the destination that `name` evaluates to
</portal>

<portal-target v-bind:name="name">
  by changing the 'name', you can define which portal's content should be shown.
</portal-target>
```

## "Slim" - removing the wrapper

Vue components always need a single root element. Since `<portal-target>` can't know in advance whether or not it will receive content with more than one root element, it will render a wrapper element around the content to provide a single root node.

However, if you know that you will send content with a single root element only, you can use the `slim` prop to tell `<portal-target>` to render that element only and do without the wrapper element.

This can be useful if `<portal-target>`s wrapper element is creating problems for your styling.

<!-- prettier-ignore -->
```html
<portal to="destination">
  <div>
    <p>This content has a single root node (the div)</p>
    <p>
      Therefore, we can tell the PortalTarget to do without a root element of
      its own
    </p>
  </div>
</portal>

<portal-target name="destination" slim />
```

The `slim` property also works on `<portal>` components when they are `disabled` (see [here](../api/portal.md#slim)).

## Scoped Slots <Badge text="1.3.0+" />

PortalVue can also be used with [Scoped Slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots)! This allows you to send a scoped slot to a PortalTarget, which can then provide props for the slot content:

<!-- prettier-ignore -->
```html
<portal to="destination">
  <p slot-scope="{message}">{{message}}</p>
</portal>

<portal-target
  name="destination"
  :slot-props="{message: 'Hello from the Target to You!'}"
/>
```

**Result:**

<!-- prettier-ignore -->
```html
<div class="vue-portal-target">
  <p>Hello from the Target to You!</p>
</div>
```

## Transitions <Badge text="1.2.0+"/>

You can pass transitions to a `<portal>` without problems. It will behave just the same when the content is being rendered in the `<portal-target>`:

<!-- prettier-ignore -->
```html
<portal to="destination">
  <transition name="fade">
    <p v-if="hasMessages" key="1">You have {{messages.length}} new messages</p>
    <p v-else key="2">No unread messages</p>
  </transition>
</portal>
```

However, if you use a `<portal-target>` for multiple `<portal>`s, you likely want to define the transition on the target end instead. This is also supported.

::: warning
This API underwent a significant change in the 2.0.0 release. Below, examples for both old and new syntax are given. Keep an eye on the version badges next to them.
:::

#### New Syntax <Badge text="2.0.0+" />

<!-- prettier-ignore -->
```html
<portal-target
  transition="fade"
/>
```

Here, the string `'fade'` would be expected to be the name of a globally registered component that wraps a `<transition>` component ([see Vue docs on reusable transitions](https://vuejs.org/v2/guide/transitions.html#Reusable-Transitions)). You can also pass a component options object or a constructor. We have [more examples](../api/portal-target.md#transition) in the API docs.

#### Old Syntax <Badge text=">=1.2 <2.0" type="warning" />

<!-- prettier-ignore -->
```html
<portal-target
  :transition="{ name: 'fade'}"
  :transition-events="{ enter: onEnterCallBack }"
/>
```

One important behaviour to know is this:

- When the PortalTarget would render only one content element, a `<transition>` is created.
- When it would render multiple elements, the rendered root wrapper element will be turned into a `<transition-group>` component instead.

## Rendering outside of the Vue-App <Badge text="3.0.0+"/>

TODO: Introduce `createPortalTarget` and explain limited usage scenarios

