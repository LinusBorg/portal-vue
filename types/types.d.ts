import { Slot } from 'vue';
export declare type Name = string | symbol;
export interface StringBoolMap {
    [key: string]: boolean;
}
export interface TransportInput {
    to: Name;
    from: Name;
    order?: number;
    content: Slot;
}
export declare type TransportsHub = Map<Name, TransportsByTarget>;
export declare type TransportsByTarget = Map<Name, Transport>;
export interface Transport {
    to: Name;
    from: Name;
    order: number;
    content: Slot;
}
export interface TransportCloser {
    to: Name;
    from?: Name;
}
export interface PortalProps {
    to: Name;
    name?: Name;
    disabled?: boolean;
    order?: number;
    slotProps?: Record<string, any>;
}
export declare type PortalTargetProps = Partial<{
    multiple: boolean;
    name: Name;
    slotProps: object;
}>;
export declare type Wormhole = Readonly<{
    open: (t: TransportInput) => void;
    close: (t: TransportCloser) => void;
    getContentForTarget: (t: Name) => Transport[];
    transports: TransportsHub;
}>;
