<script>
	import Vue from 'vue'
	import wormhole from './wormhole'
	import Target from './portal-target'
	import { extractAttributes } from '../utils'

	export default {
		name: 'portal',
		props: {
			to: { type: String, required: true },
			mountTarget: { type: [String, HTMLElement] },
			disabled: { type: Boolean },
			tag: { type: [String], default: 'DIV'}
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
				let el,
						target = this.mountTarget

				if (target instanceof HTMLElement) {
					el = target
				}
				else if (typeof target === 'string') {
				  el = document.querySelector(this.mountTarget)
				}
				else {
					console.warn('[vue-portal]: value of mountTarget must eb of type String or HTMLElement')
					return
				}
				let attributes = extractAttributes(el)

				if (el) {

					const target = new Vue({
						...Target,
						propsData: {
							name: this.to || Math.round(Math.random() * 10000),
							tag: el.tagName,
							attributes
						}
					})
					target.$mount(el)
					this.mountedComp = target

				} else {
					console.warn('[vue-portal]: The specified mountTarget ' + this.mountTarget + ' was not found')
				}
			}
		},

		render(h) {
      const children = this.$slots.default

			if (children.length && this.disabled){

				return children.length <= 1
				  ? children[0] // TODO: does this work when that vnode is a component?
					: h(this.tag, children)

			} else {

				return h(this.tag, { class: { 'v-portal': true }, style: { display: 'none' }, key: 'v-portal-placeholder' })

			}
		}
	}
</script>
