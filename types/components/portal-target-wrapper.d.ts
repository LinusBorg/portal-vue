declare const _default: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        required: true;
    };
    slotProps: {
        type: ObjectConstructor;
        default: () => {};
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    name: string;
    slotProps: Record<string, any>;
} & {}>, {
    slotProps: Record<string, any>;
}>;
export default _default;
