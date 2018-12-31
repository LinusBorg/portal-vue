import Vue from 'vue';
import { VNode } from 'vue';
import { Transport, PropWithComponent } from '../types';
declare const _default: import("vue").VueConstructor<{
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
    transitionGroup: boolean;
} & Vue>;
export default _default;
