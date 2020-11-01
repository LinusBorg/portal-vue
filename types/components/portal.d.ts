import { Slots } from 'vue';
import { PortalProps } from '@/types';
export declare function usePortal(props: PortalProps, slots: Slots): void;
declare const _default: import("vue").DefineComponent<{
    disabled: {
        type: BooleanConstructor;
    };
    name: {
        type: StringConstructor;
        default: () => string;
    };
    order: {
        type: NumberConstructor;
    };
    slotProps: {
        type: ObjectConstructor;
        default: () => {};
    };
    to: {
        type: StringConstructor;
        default: () => string;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    disabled: boolean;
    name: string;
    slotProps: Record<string, any>;
    to: string;
} & {
    order?: number | undefined;
}>, {
    disabled: boolean;
    name: string;
    slotProps: Record<string, any>;
    to: string;
}>;
export default _default;
