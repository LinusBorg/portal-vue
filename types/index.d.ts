import { VueConstructor } from 'vue';
import Portal from '@/components/portal';
import PortalTarget from '@/components/portal-target';
import PortalTargetProvider from '@/components/portal-target-provider';
import { wormhole as Wormhole } from '@/components/wormhole';
declare global {
    interface Window {
        Vue: VueConstructor;
        ROLLUP_BUILD_MODE: string;
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
};
export default _default;
export { Portal, PortalTarget, PortalTargetProvider, Wormhole };
