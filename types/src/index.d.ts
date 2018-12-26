import Vue from 'vue';
import { VueConstructor } from 'vue';
declare global {
    interface Window {
        Vue: VueConstructor;
    }
}
interface PluginOptions {
    portalName?: string;
    portalTargetName?: string;
    portalTargetProviderName?: string;
}
declare function install(Vue: VueConstructor, options?: PluginOptions): void;
declare const _default: {
    install: typeof install;
    Portal: VueConstructor<{
        clear(target?: string | undefined): void;
        normalizedSlots(): import("vue").VNode[] | Function[];
        normalizeChildren(children: Function | import("vue").VNode[]): import("vue").VNode[];
        sendUpdate(): void;
    } & {
        disabled: boolean;
        name: string;
        order: number;
        slim: boolean;
        slotProps: any;
        tag: string;
        to: string;
    } & Vue>;
    PortalTarget: VueConstructor<{
        transports: import("./types").Transports;
        firstRender: boolean;
    } & {
        emitChange(newTransports: import("./types").Transport[], oldTransports: import("./types").Transport[]): void;
        children(): import("vue").VNode[];
        noWrapper(): boolean;
    } & {
        ownTransports: import("./types").Transport[];
        passengers: import("vue").VNode[];
        withTransition: boolean;
        transitionData: import("vue").VNodeData;
    } & {
        multiple: boolean;
        name: string;
        slim: boolean;
        slotProps: any;
        tag: string;
        transition: any;
        transitionEvents: any;
    } & Vue>;
    Wormhole: import("vue/types/vue").CombinedVueInstance<{
        transports: import("./types").Transports;
        targets: import("./types").StringBoolMap;
        sources: import("./types").StringBoolMap;
    } & {
        open(transport: import("./types").TransportInput): void;
        close(transport: import("./types").TransportVector, force?: boolean): void;
        registerTarget(target: string, force?: boolean | undefined): void;
        unregisterTarget(target: string): void;
        registerSource(source: string, force?: boolean | undefined): void;
        unregisterSource(source: string): void;
        hasTarget(to: string): boolean;
        hasSource(to: string): boolean;
        $_getTransportIndex({ to, from }: import("./types").TransportVector): number;
    } & Record<never, any> & Vue, object, object, object, Record<never, any>>;
};
export default _default;
