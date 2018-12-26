---
sidebar: auto
prev: ./caveats
next: false
---

## About 2.0.0

Version 2.0.0 doesn't introduce many new features, but some Breaking Changes - some in the form of different behaviour, some in the form of removal of funcionality.

The core functionality of `<Portal>` and `<PortalTarget>` in't really affected by it. The two major areas that are affected are:

1. Rendering to a DOM element outside of your Vue app - in 1.0.0 this was done with the `targetEl` prop
2. Sliming down the API of the `Wormhole` object, since it offered some APIs that - in our experience - offered little value in the end.

## Things we added

### Source & Target registration & duplicate checks

`<Portal>` and `<PortalTarget>` components now register themselves with the plugin (and unregister again when they are destroyed).

That allows us to provide warnings if you try to create a component with a name that already exists.

You can also check for this programmatically with [`Wormhole.hasSource() / .hasTarget()`](../api/wormhole.md#)

### PortalTargetProvider

## Things we changed

## Things we removed

## Things we fixed

## Migration tipps

# Migration from version 1.\*
