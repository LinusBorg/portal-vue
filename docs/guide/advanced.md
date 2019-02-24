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

Vue components always need a single root element. Since `<portal-target>` can't know in advance weither or not it will receive content with more than one root element, it will render a wrapper element around the content to provide a single root node.

However, if you know that you will send content with a single root element only, you can use the `slim` prop to tell `<portal-target>` to render that element only and do without the wrapper element.

This can be useful if `<portal-target>`s wrapper element is creating problem for your styling.

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

The `slim` property also works on `<portal>` components when the are `disabled` (see [here](../api/portal.md#slim)).

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
This API underwent a significant change in the 2.0.0 release. Below, examples for both old and new snytax are given. Keep an eye on the version badges next to them.
:::

#### New Syntax <Badge text="2.0.0+" />

<!-- prettier-ignore -->
```html
<portal-target
  transition="fade"
/>
```

Here, the string `'fade'` would be expected to be the name of a globally registered component that wraps a `<transition>` component ([see Vue docs on reusable transitions](https://vuejs.org/v2/guide/transitions.html#Reusable-Transitions)). You can also pass a componnt options object or a constrcutor. We have [more examples](../api/portal-target.md#transition) in the API docs.

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

## Rendering outside of the Vue-App <Badge text="2.0.0+"/>

If you want to render your content to a place outside of the control of your Vue app, Portal-Vue also got your covered. It gives you a special `<MountingPortal>` component that mounts a `<PortalTarget>` to any element in the DOM - you just define it with a normal DOM selector.

It then provides the (auto-generated) name of the generated Target to its children through a scoped slot.

<!-- prettier-ignore -->
```html
<div id="app">
  <MountingPortal mountTo="#widget" name="source" append>
    <p>Content for the Target</p>
  </MountingPortal>
<div>

<script>
  new Vue({el: '#app'})
</script>
<aside id="widget" class="widget-sidebar">
  This Element is not controlled by our Vue-App,
  but we can create a <portal-target> here with <MountingPortal>.
</aside>
```

When `<MountingPortal>` is destroyed, it takes are of destroying the `<PortalTarget>`.

:::tip
When the `append` prop is set, the Target will be mounted to as a child of the specified element instead of replacing it.

This is great if you want to mount more than one PortalTarget there, for example.

When `append` is used, `<MountingPortal>` will also remove the appended element when destroying the `<PortalTarget>`
:::

### `targetEl` - The Old Way <Badge type="warning" text="1.* only"/>

<!-- prettier-ignore -->
```html {3}
<body>
  <div id="app">
    <portal name="" target-el="#widget">
      <p>
        PortalVue will dynamically mount an  instance of <portal-target>
        in place of the Element with `id="widget"`,
        and this paragraph will be rendered inside of it.
      </p>
    </portal>
  </div>
</body>
```

:::warning
This feature had a couple of problems that were the trigger to revamp it for 2.0 as can be seen above.

It was both a bit buggy and made the code harder to maintain, so we extracted it into a separate component for 2.0
:::
