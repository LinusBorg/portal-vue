import { Slots } from 'vue';
export interface PortalProps {
    disabled: boolean;
    name: string;
    order: number;
    slim?: boolean;
    slotProps: Record<string, any>;
    to: string;
}
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
        default: number;
    };
    slim: {
        type: BooleanConstructor;
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
    to: string;
    name: string;
    order: number;
    disabled: boolean;
    slim: boolean;
    slotProps: Record<string, any>;
} & {}>, {
    to: string;
    name: string;
    order: number;
    disabled: boolean;
    slim: boolean;
    slotProps: Record<string, any>;
}>;
export default _default;
