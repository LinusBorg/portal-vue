# Getting Started with PortalVue

## What is PortalVue?

PortalVue is a set of two components that allow you to render a component's template
(or a part of it) anywhere in the document - even outside the part controlled by your Vue App!

## Getting Started

### A simple example

```html
<portal to="destination">
  <p>This slot content will be rendered wherever the <portal-target> with name 'destination'
    is located.
  </p>
</portal>

<portal-target name="destination">
  <!--
  This component can be located anwhere in your App.
  The slot content of the above portal component will be rendered here.
  -->
</portal-target>
```

See it in action in this fiddle:

<iframe height='300' scrolling='no' title='PortalVue - Simple Example' src='//codepen.io/LinusBorg/embed/preview/QvVqpY/?height=265&theme-id=light&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/LinusBorg/pen/QvVqpY/'>PortalVue - Simple Example</a> by Thorsten Lünborg (<a href='http://codepen.io/LinusBorg'>@LinusBorg</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

### Setup

Install Package:

```bash
npm install --save portal-vue

# or with yarn
yarn add portal-vue
```

Add it to your application:

```javascript
import PortalVue from 'portal-vue'

Vue.use(PortalVue)
```

For more detailed installation instructions, additional options and installation via CDN,
see the <a href="#" router-link="/docs/installation">Installation</a> page in the documentation.

## Basic Usage

### Enabling/Disabling the Portal

```html
<portal to="destination" :disabled="true">
  <p>
    This slot content will be rendered right here as long as the `disabled` prop
    evaluates to `true`,<br />
    and will be rendered at the defined destination as when it is set to `false`
    (which is the default).
  </p>
</portal>
```

### Conditional rendering with v-if

```html
<portal to="destination" v-if="usePortal">
  <ul>
    <li>
      When 'usePortal' evaluates to 'true', the portal's slot content will be
      rendered at the destination.
    </li>
    <li>
      When it evaluates to 'false', the content will be removed from the
      destination
    </li>
  </ul>
</portal>
```

## Advanced Usage

### Switching targets and sources

The `to` prop of `<portal>` and the `name` prop of `<portal-target>` can be changed dynamically with `v-bind`, allowing you to send content of one `<portal>` to a different `<portal-target>`, or switch the source of a `<portal-target>` from one `<portal>` to another.

```html
<portal v-bind:to="name">
  Content will be dynamically sent to the destination that `name` evaluates to
</portal>

<portal-target v-bind:name="name">
  by changing the 'name', you can define which portal's content should be shown.
</portal-target>
```

### Showing content from multiple `Portal`s in one target:

The `<portal-target>` component has a `multiple` mode, which allows to render content from multiple `<portal>` components _at the same time_.

The order the content is rendered in can be adjusted through the `order` prop on the `<portal>` components:

**Source**

```html
<portal to="destination" :order="2">
  <p>some content</p>
</portal>
<portal to="destination" :order="1">
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

### Removing the Wrapper element

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

The `slim` property also works on `<portal>` components when they are `disabled`.

### Using Scoped Slots

> since `1.3.0`

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

### Transitions

> since `1.2.0`

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

### Rendering outside of the Vue-App

```html
<body>
  <div id="app">
    <portal target-el="#widget">
      <p>
        PortalVue will dynamically mount an  instance of <portal-target> in place of the Element
        with `id="widget"`, and this paragraph will be rendered inside of it.
      </p>
    </portal>
  </div>
  <script>
    new Vue({el: '#app'})
  </script>
  <aside id="widget" class="widget-sidebar">
    This Element is not controlled by our Vue-App, but we can create a <portal-target> there dynamically.
  </aside>
</body>
```

## Use Cases

### Working around `position: fixed` issues

In older browsers, `position: fixed` works unreliably when the element with that property
is nested in a node tree that has other `position` values.

But we normally need it to render components like modals, dialogs, notifications, snackbars
and similar UI elements in a fixed position.

With PortalVue, you can instead render the component to a `<portal-target>` that you can position
as the very last in the page's `body`, making styling and positioning much easier and less error-prone.

Now you can position your components with `position: absolute` instead

```html
<body>
  <div id="app" style="position: relative;">
    <div>
      <portal to="notification-outlet">
        <notification style="position: absolute; top: 20px; right: 20px;">
          This modal can be positioned absolutely very easily.
        </notification>
      </portal>
    </div>
    <portal-target name="notification-outlet"></portal-target>
  </div>
</body>
```

### Rendering dynamic widgets

If you use Vue for small bits and pieces on your website, but want to render something in a location at the other end of the page, PortalVue got you covered.

### Tell us about your use case!

We're sure you will find use cases beyond the ones we mentioned. If you do, please
let us know by opening an issue on <a href="http://github.com/linusborg/portal-vue">Github</a>
and we will include it here.
