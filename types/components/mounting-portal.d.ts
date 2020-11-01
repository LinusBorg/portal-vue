declare const _default: import("vue").DefineComponent<{
    mountTo: {
        type: StringConstructor;
        required: true;
    };
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
    slotProps: {
        type: ObjectConstructor;
        default: () => {};
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    to: {
        type: StringConstructor;
        default: () => string;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    targetSlotProps: {
        type: ObjectConstructor;
        default: () => {};
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    disabled: boolean;
    name: string;
    order: number;
    slotProps: Record<string, any>;
    to: string;
    multiple: boolean;
    mountTo: string;
    tag: string;
    targetSlotProps: Record<string, any>;
} & {}>, {
    disabled: boolean;
    name: string;
    order: number;
    slotProps: Record<string, any>;
    to: string;
    multiple: boolean;
    tag: string;
    targetSlotProps: Record<string, any>;
}>;
export default _default;
