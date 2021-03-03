---
sidebar: auto
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

Vue.use(PortalVue)
```

### CDN

PortalVue is available through a couple of CDNs, I recommend
<a href="hhtp://www.unpkg.com">unpkg.com</a>

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

### Nuxt Module

:::tip Hint
Only relevant for users of the [Nuxt](https://nuxtjs.org) framework
:::

First install from NPM, then add `portal-vue/nuxt` to modules section of `nuxt.config.js`

```javascript
{
  modules: ['portal-vue/nuxt']
}
```

### Quasar (installing globally)

:::tip Hint
Only relevant for users of the [Quasar](https://quasar.dev) framework
:::

First install from NPM, then add a file at src/boot/portal.js with the following contents:

```javascript
import PortalVue from 'portal-vue'
export default({ Vue }) => {
  Vue.use(PortalVue)
}
```

and finally add 'portal' to the boot array in quasar.conf.js

```javascript
  ...
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: [
      'aBunchOfOtherBits',
      'portal'
    ],
  ...
```

## Options

When installing with `Vue.use()`, you can pass options to change the component names.

```javascript
Vue.use(PortalVue, {
  portalName: 'my-portal', // default: 'portal'
  portalTargetName: 'my-target', // default:'portal-target'
})
```

These options would make the components available globally as `<my-portal>` and `<my-target>` respectively.

## Using the components locally

If you don't want to register the components globally, don't do `Vue.use('PortalVue')`

Instead, import the component(s) in those components that you need them in and register them locally:

```javascript
import { Portal, PortalTarget, MountingPortal } from 'portal-vue'

export default {
  components: {
    Portal,
    PortalTarget,
    MountingPortal,
  },
}
```

## Builds

Portal-Vue ships in three different Builds.

| Type           | File                    | Usage                                                    |
| -------------- | ----------------------- | -------------------------------------------------------- |
| UMD (minified) | `portal-vue.umd.min.js` | To be included in a browser                              |
| UMD            | `portal-vue.umd.js`     | To be included in a browser. Non minified for debugging. |
| ESM            | `portal-vue.esm.js`     | For usage with bundlers that _do_ support ESModules.     |
| Commonjs       | `portal-vue.common.js`  | For usage with bundlers that don't support ESModule      |

_Notes_

### UMD

When including Portal-vue from a CDN, make sure you get one of the of UMD builds.

**About CDNs**: `unpkg.com` and `jsdelivr.com` will load the umd lib automatically.

If you include it from other sources directly in your HTML, make sure to import `portal-vue/dist/portal-vue.umd.min.js`

### Commonjs

This is the default main file of the package.

Webpack 1 doesn't support commonjs, neither do some dev tools, like jest doesn't either. So this is a sensible default to use.

### ESM

Webpack >=2, rollup and parcel all can natively understand ESModules, so this is the best build to use with those bundlers.

The ESM version is marked as the default export of `package.json` for consumers that understand the `"module"` field in `package.json` (which is true for all the aforementioned bundlers), so doing `import PortalVue from 'portal-vue'` will automatically give you the ESM build if the bundler supports it.
