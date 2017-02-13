<script>
	import wormhole from './wormhole'
	import Target from './portal-target'
	import Vue from 'vue'

	export default {
		name: 'portal',
		props: {
			to: { type: String, required: true },
			mountTarget: { type: [String,Boolean], default: false },
			disabled: { type: Boolean },
			tag: { type: String, default: 'DIV'}
		},

		mounted() {
			if (this.mountTarget) {
				this.mountToTarget()
			}
			if (!this.disabled) {
				this.sendUpdate()
			}
		},

		updated() {
			if (this.disabled) {
				this.clear()
			} else {
				this.sendUpdate()
			}
		},

		beforeDestroy() {
			this.clear()
			if (this.mountedComp) {
				this.mountedComp.$destroy()
			}
		},

		watch: {
			to (newValue, oldValue) {
				oldValue && this.clear(oldValue)
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

			clear(target) {
				wormhole.clear(target || this.to)
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
      const children = this.$slots.default


			if (children.length && this.disabled){

				const children = this.$slots.default

				return children.length <= 1
				  ? children[0] // TODO: does this work when that vnode is a component?
					: h(this.tag, children)

			} else {

				return h(this.tag, { class: { 'v-portal': true }, style: { display: 'none' }, key: 'v-portal-placeholder' })

			}
		}
	}
</script>
