import Vue from 'vue';
import { VueConstructor } from 'vue';
export declare type withPortalTarget = VueConstructor<Vue & {
    portalTarget: any;
}>;
declare const _default: VueConstructor<{
    props: {
        [x: string]: any;
    };
} & {
    append: string | boolean;
    force: boolean;
    mountTo: string;
    name: string;
} & Vue & {
    portalTarget: any;
}>;
export default _default;
