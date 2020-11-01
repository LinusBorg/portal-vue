import { PropType, FunctionalComponent, ComponentInternalInstance, VNode } from 'vue';
export declare const PortalTargetContent: FunctionalComponent<{
    content?: VNode | VNode[] | undefined;
}>;
declare const _default: import("vue").DefineComponent<{
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        required: true;
    };
    slotProps: {
        type: ObjectConstructor;
        default: () => {};
    };
    __parent: {
        type: PropType<ComponentInternalInstance>;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}> | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    name: string;
    slotProps: Record<string, any>;
    multiple: boolean;
} & {
    __parent?: ComponentInternalInstance | undefined;
}>, {
    slotProps: Record<string, any>;
    multiple: boolean;
}>;
export default _default;
