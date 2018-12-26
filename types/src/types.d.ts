import { VNode } from 'vue';
export interface StringBoolMap {
    [key: string]: boolean;
}
export interface Transports {
    [key: string]: Transport[];
}
export interface TransportInput {
    to: string;
    from: string;
    order: number;
    passengers: Array<VNode | Function>;
}
export interface Transport {
    to: string;
    from: string;
    order: number;
    passengers: ReadonlyArray<VNode | Function>;
}
export interface TransportVector {
    to: string;
    from: string;
}
