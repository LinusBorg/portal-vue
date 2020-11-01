import { Transport } from '@/types';
import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    transport: {
        type: PropType<Transport>;
        required: true;
    };
    slotProps: {
        type: ObjectConstructor;
        default: () => {};
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    slotProps: Record<string, any>;
    transport: Transport;
} & {}>, {
    slotProps: Record<string, any>;
}>;
export default _default;
