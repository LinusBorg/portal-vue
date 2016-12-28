if (this.mountTo) {
  var targetEl = document.getElementById(this.mountTo)
  // debugger
  if (!targetEl) {
    console.warn(`Target Element with id '${this.mountTo}' not found!`)
    return
  }

  var PortalTarget = this.$options.components.portalTarget
  var portalTarget = new PortalTarget({
    parent: this,
    propsData: { name: this.to },
  })
  portalTarget.$mount(targetEl)
  console.log(portalTarget)


  this.$nextTick(() => {
    this.sendUpdate()
  })

} else {
  this.$nextTick(this.sendUpdate)
}
