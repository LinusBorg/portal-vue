<script>
	import { routes } from './wormhole'

	export default  {
		name: 'portalTarget',
		props: {
			name: { type: String, required: true },
			id: { type: String },
			tag: { type: String, default: 'div' },
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
				attrs: {
					id: this.id && this.id.substr(1) || false,
				}
			}, this.passengers)
		}
	}
</script>
