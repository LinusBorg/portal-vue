---
# sidebar: auto
prev: false
next: ./getting-started
---

# Installation

## Possible ways to install

### NPM

This is the recommended way to install this Plugin.

Install with npm as a dependency:

```bash
npm i portal-vue

# or with yarn, respectively:
yarn add portal-vue
```

Then include the package in your application and install the plugin:

```javascript
import PortalVue from 'portal-vue'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(PortalVue)

app.mount('#app')
```

### CDN

PortalVue is available through a couple of CDNs, I recommend
<a href="https://www.unpkg.com">unpkg.com</a>

Just include the script tag _after_ the one of Vue.js

```html
<script src="http://unpkg.com/vue/dist/vue.js"></script>
<script src="http://unpkg.com/portal-vue"></script>
```

The components will be named `<portal>` and `<portal-target>`, respectively.

:::tip
PortalVue provides a UMD [build](#builds) (`/dist/portal-vue.umd.min.js`) which should be used in browsers, and which auto-installs itself when included via a script tag.

Unpkg and jsdelivr automatically give you this build. if you include it from another source, make sure to include the right one.
:::

## Options

When installing with `Vue.use()`, you can pass options to change the component names.

```javascript
app.use(PortalVue, {
  portalName: 'my-portal', // default: 'portal'
  portalTargetName: 'my-target', // default:'portal-target'
})
```

These options would make the components available globally as `<my-portal>` and `<my-target>` respectively.

## Using the components locally

If you don't want to register the components globally, you can import the components locally. But you still need to isntall the plugin. just pass `false`for the component options:

```js
app.use(PortalVue, {
  portalName: false,
  portalTargetName: false,
})
```

then import the component(s) in those components that you need them in and register them locally, which also allows to rename them:

```javascript
import { Portal, PortalTarget } from 'portal-vue'

export default {
  components: {
    MyPortal: Portal,
    PortalTarget,
  },
}
```

## Typescript

Portal-Vue 3 comes with full TS support. if you register the component globally, you need to tell your Vue IDE Extension (Volar) about them by adding a d.ts. file declaring these globally registered components:

```ts
declare module 'vue' {  // Vue 3
    export interface GlobalComponents {
      Portal: typeof import('portal-vue')['Portal']
      PortalTarget: typeof import('portal-vue')['PortalTarget']
    }
  }
  
  export {}
```

Don't forget to `"include"` this file in your tsconfig.
## Custom Wormhole instance

If you potentially have more than one Vue app on a page, you can avoid name conflicts by creating your own wormhole instance just for your app. This also means that your app can't send content to `PortalTarget` components in other apps running in the page, so it's probably an edge case.

```js
import PortalVue, { createWormhole } from 'portal-vue'
app.use(PortalVue, {
  wormhole: createWormhole()
})
```

## Builds

Portal-Vue ships in four different Builds.

| Type           | File                    | Usage                                                    |
| -------------- | ----------------------- | -------------------------------------------------------- |
| UMD (minified) | `portal-vue.umd.js` | To be included in a browser                              |
| UMD            | `portal-vue.umd.dev.js`     | To be included in a browser. Non minified for debugging. |
| ESM            | `portal-vue.esm.mjs`     | For usage with bundlers that _do_ support ESModules.     |

_Notes_

### UMD

When including Portal-vue from a CDN, make sure you get one of the of UMD builds.

**About CDNs**: `unpkg.com` and `jsdelivr.com` will load the umd lib automatically.

If you include it from other sources directly in your HTML, make sure to import `portal-vue/dist/portal-vue.umd.min.js`

### ESM

Webpack >=2, rollup, and parcel all can natively understand ESModules, so this is the best build to use with those bundlers.

The ESM version is marked as the default export of `package.json` for consumers that understand the `"module"` field in `package.json` (which is true for all the aforementioned bundlers), so doing `import PortalVue from 'portal-vue'` will automatically give you the ESM build if the bundler supports it.

