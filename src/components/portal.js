import wormhole from './wormhole'
export default {
	name: 'portal',
  props: {
    to: { type: String, required: true },
    mountTo: { type: String },
  },
  beforeMount() {
  	this.sendUpdate()
  },
  beforeDestroy() {
    wormhole.clear(this.to)
  },
  updated() {
		this.sendUpdate()
	},
  methods: {
  	sendUpdate() {
    	wormhole.sendUpdate(this.to, this.$slots.default)
    },
  },
  render(h) {
  	return  null
  }
}
