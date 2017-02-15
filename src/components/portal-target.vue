<script>
	import { routes } from './wormhole'

	export default  {
		name: 'portalTarget',
		props: {
			name: { type: String, required: true },
			tag: { type: String, default: 'div' },
			attributes: { type: Object },
		},
		data() {
			return {
				routes
			}
		},
		beforeDestroy() {
			this.$el.innerHTML = ''
		},

		computed: {
			passengers() {

				return this.routes[this.name] || null
			}
		},

		render(h) {
			const children = this.passengers || []

			if (children.length === 1 && !this.attributes) {
				return children[0]
			}
			else {
				return h(this.tag, {
					class: { 'vue-portal-target': true },
					attrs: this.attributes,
				}, children)
			}
		}
	}
</script>
