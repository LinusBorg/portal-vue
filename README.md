# PortalVue

> A Portal Component for Vuejs, to render DOM outside of a component, anywhere in the document.

<p style="tex-align: center">
  <img src="http://linusborg.github.io/portal-vue/assets/logo.png" alt="PortalVue Logo">
</p>


For more detailed documentation and additional Information, please visit <a href="http://linusborg.github.io/portal-vue">the docs</a>

## Installation

```
npm install --save portal-vue

// in .js
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
  This component can be located anwhere in your App.
  The slot content of the above portal component will be rendered here.
  -->
</portal-target>
```
