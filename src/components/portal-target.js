import wormhole from './wormhole'
export default  {
	name: 'portalTarget',
  props: {
    name: { type: String, required: true },
    tag: {type: String, default: 'div' }
  },
  beforeMount() {
		this.checkWormhole()
  	wormhole.$on(this.name, this.update)
  },
  beforeDestroy() {
  	wormhole.$off(this.name, this.update)
  },
	watch: {
		name(newName, oldName) {
			wormhole.$off(oldName, this.update)
			wormhole.$on(newName, this.update)
			this.checkWormhole()
		}
	}
  methods: {

		checkWormhole() {
			const passengers = wormhole.get(this.name)
			passengers && this.update(passengers)
		},

		update(passengers) {

      if (passengers) {
        this.passengers = passengers // cache vNodes for render function
      } else {
        this.passengers = null
      }
      this.$forceUpdate() // force re-render
    }
  },
  render(h) {
  	return h(this.tag, {
    	class: { 'vue-portal-target': true }
    }, this.passengers)
  }
}
