import { Slot } from 'vue';
export interface StringBoolMap {
    [key: string]: boolean;
}
export interface TransportInput {
    to: string;
    from: string;
    order?: number;
    content: Slot;
}
export declare type TransportsHub = Map<string, TransportsByTarget>;
export declare type TransportsByTarget = Map<string, Transport>;
export interface Transport {
    to: string;
    from: string;
    order: number;
    content: Slot;
}
export interface TransportCloser {
    to: string;
    from?: string;
}
export interface PortalProps {
    to: string;
    name?: string;
    disabled?: boolean;
    order?: number;
    slotProps?: Record<string, any>;
}
export declare type PortalTargetProps = Partial<{
    multiple: boolean;
    name: string;
    slotProps: object;
}>;
export declare type Wormhole = Readonly<{
    open: (t: TransportInput) => void;
    close: (t: TransportCloser) => void;
    getContentForTarget: (t: string) => Transport[];
    transports: TransportsHub;
}>;
