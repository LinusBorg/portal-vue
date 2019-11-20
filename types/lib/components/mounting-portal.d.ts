import Vue from 'vue';
import { VueConstructor } from 'vue';
import { PropWithComponent } from '../types';
export declare type withPortalTarget = VueConstructor<Vue & {
    portalTarget: any;
}>;
declare const _default: VueConstructor<{
    append: string | boolean;
    bail: boolean;
    mountTo: string;
    disabled: boolean;
    name: string;
    order: number;
    slim: boolean;
    slotProps: any;
    tag: string;
    to: string;
    multiple: boolean;
    targetSlim: boolean;
    targetSlotProps: any;
    targetTag: string;
    transition: PropWithComponent;
} & Vue & {
    portalTarget: any;
}>;
export default _default;
