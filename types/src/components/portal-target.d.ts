import Vue from 'vue';
import { VNode, VNodeData } from 'vue';
import { Transport } from '../types';
declare const _default: import("vue").VueConstructor<{
    transports: import("../types").Transports;
    firstRender: boolean;
} & {
    emitChange(newTransports: Transport[], oldTransports: Transport[]): void;
    children(): VNode[];
    noWrapper(): boolean;
} & {
    ownTransports: Transport[];
    passengers: VNode[];
    withTransition: boolean;
    transitionData: VNodeData;
} & {
    multiple: boolean;
    name: string;
    slim: boolean;
    slotProps: any;
    tag: string;
    transition: any;
    transitionEvents: any;
} & Vue>;
export default _default;
