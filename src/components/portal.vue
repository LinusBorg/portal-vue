<script>
	import wormhole from './wormhole'
	import Target from './portal-target'
	import Vue from 'vue'

	export default {
		name: 'portal',
		props: {
			to: { type: String, required: true },
			mountTarget: { type: [String,Boolean], default: false },
		},

		mounted() {
			if (this.mountTarget) {
				this.mountToTarget()
			}
			this.sendUpdate()
		},

		beforeUpdate() {
			this.sendUpdate()
		},

		beforeDestroy() {
			wormhole.clear(this.to)
			if (this.mountedComp) {
				this.mountedComp.$destroy()
			}
		},

		watch: {
			to (newValue, oldValue) {
				oldValue && wormhole.clear(oldValue)
				this.sendUpdate()
			},
			mountTarget (newValue, oldValue) {
				this.mountToTarget()
			}
		},

		methods: {

			sendUpdate() {
				if (this.to) {

					wormhole.sendUpdate(this.to, [...this.$slots.default])

				} else {
					console.warn('[vue-portal]: You have to define a targte via the `to` prop.')
				}
			},

			mountToTarget() {
				const el = document.querySelector(this.mountTarget)

				if (el) {

					const target = new Vue({
						...Target,
						propsData: {
							name: this.to || Math.round(Math.random() * 10000),
							id: this.mountTarget,
							tag: el.tagName,
						}
					})
					target.$mount(el)
					this.mountedComp = target

				} else {
					console.warn('[vue-porta]: The specified mountTarget ' + this.mountTarget + ' was not found')
				}
			}
		},

		render(h) {

			return null
		}
	}
</script>
