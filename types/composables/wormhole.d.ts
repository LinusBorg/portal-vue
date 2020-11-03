import { Wormhole } from '../types';
import { InjectionKey } from 'vue';
export declare const wormholeSymbol: InjectionKey<Readonly<{
    open: (t: import("../types").TransportInput) => void;
    close: (t: import("../types").TransportCloser) => void;
    getContentForTarget: (t: import("../types").Name) => import("../types").Transport[];
    transports: import("../types").TransportsHub;
}>>;
export declare function useWormhole(): Readonly<{
    open: (t: import("../types").TransportInput) => void;
    close: (t: import("../types").TransportCloser) => void;
    getContentForTarget: (t: import("../types").Name) => import("../types").Transport[];
    transports: import("../types").TransportsHub;
}>;
export declare function provideWormhole(wormhole: Wormhole): void;
