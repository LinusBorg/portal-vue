---
sidebar: auto
prev: ./caveats
next: false
---

# About 2.0.0

Version 2.0.0 doesn't introduce many new features, but some - and also, some breaking changes - some in the form of different behaviour, some in the form of removal of functionality we deem to not be worth their weight.

The core functionality of `<Portal>` and `<PortalTarget>` isn't affected by these changes. The two major areas that are affected are:

1. Rendering to a DOM element outside of your Vue app - in 1.0.0 this was done with the `targetEl` prop
2. Sliming down the API of the `Wormhole` object, since it offered some APIs that - in our experience - offered little value in the end.
3. Simplifying the transitions API

## Things we added

### Source & Target registration & duplicate checks

`<Portal>` and `<PortalTarget>` components now register themselves with the plugin (and unregister again when they are destroyed).

That allows us to provide warnings if you try to create a component with a name that already exists.

You can also check for this programmatically with [`Wormhole.hasSource() / .hasTarget()`](../api/wormhole.md#)

### MountingPortal

The new `<MountingPortal>` component is a wrapper around the normal `<Portal>`. Its job is to mount a `<PortalTarget>` for the `<Portal>` to send its content to.

This job was previously solved through the `targetEl` prop on the `<Portal>` itself, but the functionality was insufficient and broke more easily.

[See API Docs for MountingPortal](../api/mounting-portal.md)

## Things we changed

### PortalTarget.transition

Setting a Transition for the `<PortalTarget>` now requires a locally or globally registered [reusable transition component](https://vuejs.org/v2/guide/transitions.html#Reusable-Transitions), which simplifies the API and reduces code in the `<PortalTarget>` component itself, and allows developers to use their own transitions that follow the pattern from the docs very easily.

More info:

- [Guide](../api/portal-target.md#transistion)
- [API Docs](./advanced.md#transitions)

### PortalTarget `@change` event

Previously, this event emitted the actual old and new content of the portal, which means: arrays containing vnodes.

There never was a real usacase for this, so we now only emit `true` or `false` depending on wether the component has content or not, which allowed us to drop a nice little bit of code.

## Things we removed

### Various Wormhole methods

We removed the following methods:

- `Wormhole.hasContentFor()`
- `Wormhole.getSourceFor()`
- `Wormhole.getContentFor()`

## Things we fixed

### Various problems with `Portal.targetEl` prop

The implementation of the `targetEl` behaviour had various problems, i.e. overwriting existing portal-targets on the same element, no working when passed a discrete element, replacing the targeted mount element and so forth.

These isses are all fixed with the revamped bahaviour that's managed by the `<MountingPortal>` component now.
