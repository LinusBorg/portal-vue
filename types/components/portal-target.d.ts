import Vue from 'vue';
import { VNode, VueConstructor, ComponentOptions } from 'vue';
import { Transport } from '../types';
export declare type PropWithComponent = VueConstructor<Vue> | ComponentOptions<Vue> | string;
declare const _default: VueConstructor<{
    transports: import("../types").Transports;
    firstRender: boolean;
} & {
    children(): VNode[];
    noWrapper(): boolean;
} & {
    ownTransports: Transport[];
    passengers: VNode[];
    withTransition: boolean;
} & {
    multiple: boolean;
    name: string;
    slim: boolean;
    slotProps: any;
    tag: string;
    transition: PropWithComponent;
} & Vue>;
export default _default;
