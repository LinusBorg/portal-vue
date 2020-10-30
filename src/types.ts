import { default as Vue, VNode, ComponentOptions, Slot, Component } from 'vue'

export interface StringBoolMap {
  [key: string]: boolean
}

export interface Transports {
  [key: string]: Transport[]
}

export interface TransportInput {
  to: string
  from: string
  order?: number
  passengers: Slot
}

export interface Transport {
  to: string
  from: string
  order: number
  passengers: Slot
}

export interface TransportVector {
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
  open: (t: Transport) => void
  close: (t: TransportVector) => void
  transports: Transports
}>
