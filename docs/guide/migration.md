---
# sidebar: auto
prev: ./caveats
next: false
---

<!-- 

TOC

- only supports Vue 3.
- usefulness in light of <teleport> (-> link to extra page)
- still has caveats
- better size
- less props as Vue 3 makes some unnecessary
- MountingPortal dropped to save kB
  - 90% of its use cases covered by <teleport>
  - for 10%: use createPortalTarget()

-->

## Migrating from PortalVue 2

PortalVue 3 is a complete re-write in order to optimize the codebase with new things Vue 3 gives us, and in the process, work over the APIs and features a bit, cleaning up some cruft here and there.

From consumer's perspective, not too much has changed, so most use cases should just continue to work or need little adjusting to make them work again.

One notable exception is `<MountingPortal>`, which was dropped in this release and is replaced with a small utility function to mount a `PortalTarget` for a normal `Portal` (see *Changes* further down.)

### Sidenotes: Vue 3 & Teleport

One question developers already accustomed with Vue 3 will will likely have is:

> "Do we actually still need this library? Vue 3 has `<Teleport>` now!"

The honest answer is: You probably don't need this library anymore for the typical use cases like moving modals to `<body>` etc. But if you are moving content _within_ your app, from one component to another, then `<Teleport>` on its own is not a good choice, and you will likely still profit from using this library.

One thing to note here is that PortalVue still does **not** use `<Teleport>`under the hood. The main reason for that decision is that there would be a lot more behavioral differences that might make migration harder if we re-built PortalVue 3 on top of `Teleport`.

So think of PortalVue 3 as a kind of Migration release that should give you more or less the same behavior you had with PortalVue 2 in you Vue 2 apps, but also comes with most of the caveats that the previous versions had.

We do plan to release another major version later (maybe even as a new, separate library), which *will* be built in top of `Teleport`, at which point you can migrate to the new version in your Vue 3 app at your own pace if you want to.

## Migration Strategy

The bread-and-butter use case should be fairly easy to migrate, as the `Portal` and `PortalTarget` Components only lost a couple of props that are now no longer required in Vue 3, like `slim` (see below).

Notable breaking changes that do need some revamping affect two use cases:

1. Transitions defined on the `PortalTarget` side
2. Removal of `MountingPortal`, which is now better solved with `Teleport`, save for one edge case (`multiple` prop) for which we will cover a migration path futher down.

## List of Changes

### Installation

As the global API of creating a Vue app and registering Plugins changed a bit, you also need to adapt your Plugin installation a bit.

See the chapter on [Installation](./guide/installation.md) for further instructions.
### Portal Component

#### `slim` prop removed

In Vue 3, components no longer require a root element, so `slim` is no longer necessary. `Portal` will no longer render a root element, independent of the number of elements in its slot content.

If you need a wrapping element, wrap `<portal>` in an element yourself:

```html
<!-- Renders no element -->
<portal to="someTarget"></portal>

<!-- Wrap it in an element if you need it encapsulated i.e. for styling -->
<div>
  <portal to="someTarget"></portal>
</div>
```
### PortalTarget Component

#### `slim` prop removed

In Vue 3, components no longer require a root element, so `slim` is no longer necessary. `Portal` will no longer render a root element, independent of the number of elements in its slot content.

If you need a wrapping element, wrap `<portal>` in an element yourself:

```html
<!-- will not render its content in a root element -->
<portal-target name="someTarget" />

<!-- Wrap it in an element if you need it encapsulated i.e. for styling -->
<div>
  <portal-target name="someTarget" />
</div>
```

#### New: `v-slot:wrapper`

You can now pass an additional named slot to `PortalTarget` that can be used  to wrap the contents coming from multiple `Portal` in markup individually:

```html
<portal-target>
<portal-target name="target">
  <template v-slot:wrapper="nodes">
    <div class="some fancy box styles">
      <component :is="node" v-for="node in nodes" />
    </div>
  </template>
</portal-target>
```

See: [PortalTarget API: Wrapper slot](./api/portal-target.md/#wrapper)

#### `transition`, `transition-events` props removed.

Instead of these props, you can now use the new `v-slot:wrapper` to wrap content in `<transition>` or `<transition-group>` components. [See the docs for more info here](./guide/advanced.md#portaltarget-transitions)

### Removed: MountingPortal

This component was removed. Depending on your use case, you have two alternative migration paths:

1. You move content from one `Portal` only: Use Vue's own `Teleport` instead ([Teleport docs](https://v3.vuejs.org/api/built-in-components.html#teleport))
2. You want to move content from multiple Places to the same mounted Portal: use `createPortalTarget()` utility function:

```html
<template>
  <portal to="target-name">
    <p>This is the content to move</p>
  </portal>
</template>

<script>
import { createPortalTarget } from 'portal-vue'

export default {

  created() {
    createPortalTarget('#id-of-target-element', {
      name: 'target-name'
      // portal props
    })
  }
}
</script>
```

In practice, you would likely call this function somewhere more global once, so that all other `Portal`components can move content this single `PortalTarget`.

<!-- TODO: Link to docs -->

### Wormhole

The wormhole is the connecting "store" between the `Portal` and `PortalTarget` components. in PortalVue 2, it was a singleton, which meant that all apps and libraries on one page shared the same namespace for `to=""` names.

PortalVue 3 still provides a default instance to all components in an app when installing the plugin, but now you can optionally create your own instance and use that instead of the default one.

[Read more here](./guide/installation.md#custom-wormhole-instance)


### Testing