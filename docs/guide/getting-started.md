---
# sidebar: auto
prev: ./installation
next: ./advanced
---
# Getting Started with Portal-Vue

## What is PortalVue?

PortalVue is a set of two components that allow you to render a component's template
(or a part of it) anywhere in the document - even outside the part controlled by your Vue App!

::: tip What about Vue 3's `Teleport`?
Good question! For most scenario's, you might not even need `portal-vue`, since the new `Teleport` component does it better than this library does (read: Without the [caveats](./caveats.md)).

For an in-depth explanation, look [here](#) <!-- TODO: provide link -->
:::

## Setup

Install Package:

```bash
npm install --save portal-vue@next

# or with yarn
yarn add portal-vue@next
```

Add it to your application:

```js
import PortalVue from 'portal-vue'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(PortalVue)

app.mount('#app')
```

For more detailed installation instructions, additional options and installation via CDN,
see the [Installation](./installation.md) section of the documentation.

## Browser Support

This project is build for modern Javascript, sind Vue itself also targets modern browsers. It supports all browsers that also support ES Modules - those are:

* Chrome >=61
* Firefox >=60
* Safari >=11
* Edge >=16

If you need to support older browsers for some reason, make sure to include `node_modules/portal-vue/dist` in the list of files that you transpile with babel.

Vue CLI offers a dedicated option for this with [`transpileDependencies`](https://cli.vuejs.org/config/#transpiledependencies)

```js
// vue.config.js
module.exports = {
  transpileDependencies: ['portal-vue']
}
```

## Usage

:::tip About the examples
The following examples contain live demos. When looking at them, keep in mind that for demo purposes, we move content around within one component, however in reality the `<portal-target>` can be positioned anywhere in your App.

Also, the code of the Examples uses the Single-File-Component Format ("`.vue`" files). If you're not familiar with this, check out the official docs [here](https://vuejs.org/v2/guide/single-file-components.html).
:::

### The Basics

<!-- prettier-ignore -->
```html
<portal to="destination">
  <p>This slot content will be rendered wherever the
    <portal-target> with name 'destination'
    is located.
  </p>
</portal>

<portal-target name="destination">
  <!--
  This component can be located anywhere in your App.
  The slot content of the above portal component will be rendered here.
  -->
</portal-target>
```

<!-- SplitDisplay>
  <Examples-Basic slot="example"/>
  <<< @/docs/.vuepress/components/Examples/Basic.vue
/SplitDisplay> -->

### Enabling/Disabling the Portal

<!-- prettier-ignore -->
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

<!-- SplitDisplay>
  <Examples-Disable slot="example"/>
  <<< @/docs/.vuepress/components/Examples/Disable.vue{3,11,16}
</SplitDisplay> -->

### Conditional rendering with v-if

<!-- prettier-ignore -->
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

<!-- SplitDisplay>
  <Examples-Conditional slot="example"/>
  <<< @/docs/.vuepress/components/Examples/Conditional.vue{3,13}
</SplitDisplay> -->

### Multiple Portals, one Target

The `PortalTarget` component has a `multiple` mode, which allows to render content from multiple `Portal` components _at the same time_.

The order the content is rendered in can be adjusted through the `order` prop on the `Portal` components:

<!-- prettier-ignore -->
```html
<portal to="destination" :order="2">
  <p>some content</p>
</portal>
<portal to="destination" :order="1">
  <p>some other content</p>
</portal>

<div class="some-wrapper">
  <portal-target name="destination" multiple />
</div>
```

**Result**

<!-- prettier-ignore -->
```html
<div class="some-wrapper">
  <p>some other content</p>
  <p>some content</p>
</div>
```

<!--
**Live Example**

SplitDisplay>
  <Examples-Multiple slot="example"/>
  <<< @/docs/.vuepress/components/Examples/Multiple.vue{6,12,17}
</SplitDisplay> 
-->

## Use Cases

### Positioning Modals & Overlays

In older browsers, `position: fixed` works unreliably when the element with that property is nested in a node tree that has other `position` values.

But we normally need it to render components like modals, dialogs, notifications, snackbars and similar UI elements in a fixed position.

Also, z-indices can be a problem when trying to render things on top of each other somewhere in the DOM.

With PortalVue, you can render your modal/overlay/dropdown component to a `<portal-target>` that you can position as the very last in the page's `body`, making styling and positioning much easier and less error-prone.

Now you can position your components with `position: absolute` instead

<!-- prettier-ignore -->
```html
<body>
  <div id="app" style="position: relative;">
    <div>
      <portal to="notification-outlet">
        <notification style="position: absolute; top: 20px; right: 20px;">
          This overlay can be positioned absolutely very easily.
        </notification>
      </portal>
    </div>
    <!-- rest of your app -->
  </div>

  <portal-target name="notification-outlet"></portal-target>
</body>
```

### Rendering dynamic widgets

If you use Vue for small bits and pieces on your website, but want to render something in a location at the other end of the page, PortalVue got you covered.

### Tell us about your use case!

We're sure you will find use cases beyond the ones we mentioned. If you do, please
let us know by opening an issue on <a href="http://github.com/linusborg/portal-vue">Github</a>
and we will include it here.
