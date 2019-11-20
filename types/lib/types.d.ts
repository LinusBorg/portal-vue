import { default as Vue, VNode, PropOptions, VueConstructor, ComponentOptions } from 'vue';
export interface StringBoolMap {
    [key: string]: boolean;
}
export interface VMRegister {
    [key: string]: Readonly<Array<Vue>>;
}
export interface Transports {
    [key: string]: Transport[];
}
export interface TransportInput {
    to: string;
    from: string;
    order?: number;
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
    from?: string;
}
export declare type PropWithComponent = VueConstructor<Vue> | ComponentOptions<Vue> | string;
export declare type PortalProps = Partial<{
    disabled: boolean;
    name: string;
    order: number;
    slim: boolean;
    slotProps: object;
    tag: string;
    to: string;
}>;
export declare type PortalTargetProps = Partial<{
    multiple: boolean;
    name: string;
    slim: boolean;
    slotProps: object;
    tag: string;
    transition: PropOptions<PropWithComponent>;
    transitionGroup: boolean;
}>;
