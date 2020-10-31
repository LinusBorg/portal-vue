import { default as Vue, VNode, ComponentOptions, Slot, Component } from 'vue'

export interface StringBoolMap {
  [key: string]: boolean
}
export interface TransportInput {
  to: string
  from: string
  order?: number
  content: Slot
}

export type TransportsHub = Map<string, TransportsByTarget>

export type TransportsByTarget = Map<string, Transport>

export interface Transport {
  to: string
  from: string
  order: number
  content: Slot
}

export interface TransportCloser {
  to: string
  from?: string
}

export type PortalProps = Partial<{
  disabled: boolean
  name: string
  order: number
  slim: boolean
  slotProps: object
  tag: string
  to: string
}>

export type PortalTargetProps = Partial<{
  multiple: boolean
  name: string
  slim: boolean
  slotProps: object
  tag: string
  transition: Component
  transitionGroup: boolean
}>

export type Wormhole = Readonly<{
  open: (t: TransportInput) => void
  close: (t: TransportCloser) => void
  getContentForTarget: (t: string) => Transport[]
  transports: TransportsHub
}>
