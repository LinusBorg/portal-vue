---
sidebar: auto
prev: ./getting-started
next: ./caveats
---

# Advanced Usage

## Switching targets & sources

The `to` prop of `<portal>` and the `name` prop of `<portal-target>` can be changed dynamically with `v-bind`, allowing you to send content of one `<portal>` to a different `<portal-target>`, or switch the source of a `<portal-target>` from one `<portal>` to another.

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

```html
<portal to="destination">
  <div>
    <p>This content has a single root node (the div)</p>
    <p>Therefore, we can tell the PortalTarget to do without a root element of its own</p>
  </div>
</portal>

<portal-target name="destination" slim />
```

The `slim` property also works on `<portal>` components when the are `disabled` (see [here](../api/portal.md#slim)).

## Scoped Slots <Badge text="1.3.0+" />

PortalVue can also be used with [Scoped Slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots)! This allows you to send a scoped slot to a PortalTarget, which can then provide props for the slot content:

```html
<portal to="destination">
  <p slot-scope="{message}">
    {{message}}
  </p>
</portal>

<portal-target name="destination" :slot-props="{message: 'Hello from the Target to You!'}" />
```

**Result:**

```html
<div class="vue-portal-target"><p>Hello from the Target to You!</p></div>
```

## Transitions <Badge text="1.2.0+"/>

You can pass transitions to a `<portal>` without problems. It will behave just the same when the content is being rendered in the `<portal-target>`:

```html
<portal to="destination">
  <transition name="fade">
    <p v-if="hasMessages" key="1">You have {{messages.length}} new messages</p>
    <p v-else key="2">No unread messages</p>
  </transition>
</portal>
```

However, if you use a `<portal-target>` for multiple `<portal>`s, you likely want to define the transition on the target end instead. This is also supported:

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

If you want to render your content to a place outside of the control of your Vue app, Portal-Vue also got your covered. It gives you a special `<PortalTargetProvider>` component that mounts a `<PortalTarget>` to any element in the DOM - you just define it with a normal DOM selector.

It then provides the (auto-generated) name of the generated Target to its children through a scoped slot.

```html
<div id="app">
  <PortalTargetProvider mountTo="#widget" append>
    <portal name="source" slot-scope="{to}" :to="to">
      <p>Content for the Portal</p>
    </portal>
  </PortalTargetProvider>
<div>

<script>
  new Vue({el: '#app'})
</script>
<aside id="widget" class="widget-sidebar">
  This Element is not controlled by our Vue-App,
  but we can create a <portal-target> here with <PortalTargetProvider>.
</aside>
```

When `<PortalTargetProvider>` is destroyed, it takes are of removing the `<PortalTarget>` and the element it created for it.

:::tip
When the `append` prop is set, the Target will be mounted to as a child of the specified element instead of replacing it.

This is great if you want to mount more than one PortalTarget there, for example.
:::

### `targetEl` - The Old Way <Badge type="warning" text="1.* only"/>

```html{3}
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
