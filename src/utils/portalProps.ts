let _id = 0

export const portalProps = {
  disabled: { type: Boolean },
  name: { type: String, default: (): object => String(_id++) as any },
  order: { type: Number, default: 0 },
  slim: { type: Boolean },
  slotProps: { type: Object, default: () => ({}) },
  tag: { type: String, default: 'DIV' },
  to: {
    type: String,
    default: (): object => String(Math.round(Math.random() * 10000000)) as any,
  },
}
