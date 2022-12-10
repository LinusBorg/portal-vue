import type { Slot } from 'vue'

export type Name = string | symbol

export interface StringBoolMap {
  [key: string]: boolean
}
export interface TransportInput {
  to: Name
  from: Name
  order?: number
  content: Slot
}

export type TransportsHub = Map<Name, TransportsByTarget>

export type TransportsByTarget = Map<Name, Transport>

export interface Transport {
  to: Name
  from: Name
  order: number
  content: Slot
}

export interface TransportCloser {
  to: Name
  from?: Name
}

export interface PortalProps {
  to: Name
  name?: Name
  disabled?: boolean
  order?: number
  slotProps?: Record<string, any>
}

export type PortalTargetProps = Partial<{
  multiple: boolean
  name: Name
  slotProps: object
}>

export type Wormhole = Readonly<{
  open: (t: TransportInput) => void
  close: (t: TransportCloser) => void
  getContentForTarget: (t: Name, returnAll?: boolean) => Transport[]
  transports: TransportsHub
}>
