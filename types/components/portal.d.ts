import { Slots } from 'vue';
import { Name, PortalProps } from '@/types';
export declare function usePortal(props: PortalProps, slots: Slots): void;
declare const _default: import("vue").DefineComponent<{
    disabled: {
        type: BooleanConstructor;
    };
    name: {
        type: (SymbolConstructor | StringConstructor)[];
        default: () => symbol;
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
    to: string;
    name: Name;
    disabled: boolean;
    slotProps: Record<string, any>;
} & {
    order?: number | undefined;
}>, {
    to: string;
    name: Name;
    disabled: boolean;
    slotProps: Record<string, any>;
}>;
export default _default;
