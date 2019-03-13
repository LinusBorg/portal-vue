# PortalVue

> A Portal Component for Vuejs, to render DOM outside of a component, anywhere in the document.

## BETA For upcoming v2.0

> This is the current stable `develop` branch with v1.5.
> We are about to release a new major version, which you can check out now, as it's in beta!
> See the `next` branch or visit https://portal-vue-next-preview.netlify.com/

<p style="tex-align: center">
  <img src="http://linusborg.github.io/portal-vue/assets/logo.png" alt="PortalVue Logo">
</p>

> Install with `npm install portal-vue`

For more detailed documentation and additional Information, please visit <a href="http://linusborg.github.io/portal-vue">the docs</a>

## Installation

```bash
npm i portal-vue

# or

yarn add portal-vue
```

```javascript
import PortalVue from 'portal-vue'
Vue.use(PortalVue)
```

## Usage

```html
<portal to="destination">
  <p>This slot content will be rendered wherever the <portal-target> with name 'destination'
    is  located.</p>
</portal>

<portal-target name="destination">
  <!--
  This component can be located anywhere in your App.
  The slot content of the above portal component will be rendered here.
  -->
</portal-target>
```

## Nuxt module

Add `portal-vue/nuxt` to modules section of `nuxt.config.js`

```javascript
{
  modules: ['portal-vue/nuxt']
}
```
