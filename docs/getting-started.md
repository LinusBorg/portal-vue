# Getting Started with PortalVue

## What is PortalVue?

PortalVue is a set of two components that allow you to render a component's template
(or a part of it) anywhere in the document - even outside of your the part that is controlled by your Vue App!

### Simple Example

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

## Setup

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

For more detailed Installation instructions, additional options and Installation via CDN,
see the <a href="#" router-link="/docs/installation">Installation</a> Page in the Documentation.

## Basic Usage

### Enabling/Disabling the Portal
```html
<portal to="destination" :disabled="true">
  <p>
    This slot content will be rendered right here as long as the `disabled` prop evaluates to `false`,<br>
    and will be rendered at the defined destination as when it is set to `true`
  </p>
</portal>
```

### Conditional rendering with v-if

```html
<portal to="destination" v-if="usePortal">
  <ul>
    <li>
      When 'userPortal' evaluates to 'true', the portal's slot content will be rendered
      at the destination.
    </li>
    <li>
      When it evaluates to 'false', the content will be removed from the detination
    </li>
  </ul>
</portal>
```

## Advanced Usage

### Switching targets and sources

The `to` prop of `<portal>` and the `name` prop of `<portal-target>` can be changed dynamically with `v-bind`, allowing you to send content of one `Portal` to a different `PortalTarget`, or switch the source of a `PortalTarget` from one `Portal` to another.

```html
<portal v-bind:to="name">
  Content will be dynamically sent to the destination that `name` evaluates to
</portal>

<portal-target v-bind:name="name">
  by changing the 'name', you can define which portal's content should be shown.
</portal-target>
```

### Showing content from multiple `Portal`s in one target:

The `PortalTarget` component has a `multiple` mode, which allows to render content from multiple `Portal` components *at the same time*.

The order the content is rendered in can be adjusted through the `order` prop on the `Portal` components:

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
<div clas="vue-portal-target">
  <p>some other content</p>
  <p>some content</p>
</div>
```

### Transitions

You can pass transitions to a `Portal` without problems. It will behave just the same when the content is being rendered in the `PortalTarget`:

```html
<portal to="destination">
  <transition name="fade">
    <p v-if="hasMessages" key="1">You have {{messages.length}} new messages</p>
    <p v-else key="2">No unread messages</p>
  </transition>
</portal>
```

However, if you use a `PortalTarget` for multiple `Portal`s, you likely want to define the transition on the target end instead. This is also supported:
```html
<portal-target 
  :transition="{ name: 'fade'}"
  :transition-events="{ enter: onEnterCallBack }"
/>
```

One important behaviour to know is this:

* When the PortalTarget would render only one content element, a `<transition>` is created.
* When it would render multiple elements, the rendered root wrapper element will be turned into a `<transition-group>` component instead.


### Rendering outside of the Vue-App

```html
<body>
  <div id="app">
    <portal name="" target-el="#widget">
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

### Tell us about your usecase!

We're sure you will find use cases beyond the ones we mentioned. If you do, please
let us know by opening an issue on <a href="http://github.com/linusborg/portal-vue">Github</a>
and we will include it here.
