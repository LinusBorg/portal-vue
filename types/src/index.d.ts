import Portal from './components/portal';
import PortalTarget, { PortalTargetContent } from './components/portal-target';
import MountingPortal from './components/mounting-portal';
import { App } from 'vue';
import { Wormhole as TWormhole } from './types';
import { useWormhole, provideWormhole } from './composables/wormhole';
export interface PluginOptions {
    portalName?: string;
    portalTargetName?: string;
    MountingPortalName?: string;
    wormhole?: TWormhole;
}
export declare function install(app: App, options?: PluginOptions): void;
export declare const plugin: typeof install;
export declare const Wormhole: Readonly<{
    open: (t: import("./types").TransportInput) => void;
    close: (t: import("./types").TransportCloser) => void;
    getContentForTarget: (t: string) => import("./types").Transport[];
    transports: import("./types").TransportsHub;
}>;
export { Portal, PortalTarget, PortalTargetContent, MountingPortal, useWormhole, provideWormhole, TWormhole, };
