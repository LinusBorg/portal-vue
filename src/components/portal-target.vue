<script>
	import { routes } from './wormhole'

	export default  {
		name: 'portalTarget',
		props: {
			name: { type: String, required: true },
			tag: { type: String, default: 'div' },
			attributes: { type: Object, default: () => ({}) },
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

			return h(this.tag, {
				class: { 'vue-portal-target': true },
				attrs: this.attributes,
			}, this.passengers)
		}
	}
</script>
