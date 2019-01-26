import Vue from 'vue';
import { VueConstructor } from 'vue';
import Portal from './components/portal';
import PortalTarget from './components/portal-target';
import MountingPortal from './components/mounting-portal';
import { wormhole as Wormhole } from './components/wormhole';
declare global {
    interface Window {
        Vue?: VueConstructor<Vue>;
    }
}
export interface PluginOptions {
    portalName?: string;
    portalTargetName?: string;
    MountingPortalName?: string;
}
declare function install(Vue: VueConstructor<Vue>, options?: PluginOptions): void;
declare const _default: {
    install: typeof install;
};
export default _default;
export { Portal, PortalTarget, MountingPortal, Wormhole };
