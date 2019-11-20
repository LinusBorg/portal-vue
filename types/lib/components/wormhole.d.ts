import Vue from 'vue';
import { Transports, TransportInput, TransportVector, VMRegister } from '../types';
export declare const Wormhole: import("vue").VueConstructor<{
    transports: Transports;
    targets: VMRegister;
    sources: VMRegister;
    trackInstances: boolean;
} & {
    open(transport: TransportInput): void;
    close(transport: TransportVector, force?: boolean): void;
    registerTarget(target: string, vm: Vue, force?: boolean | undefined): void;
    unregisterTarget(target: string): void;
    registerSource(source: string, vm: Vue, force?: boolean | undefined): void;
    unregisterSource(source: string): void;
    hasTarget(to: string): true;
    hasSource(to: string): true;
    hasContentFor(to: string): boolean;
    $_getTransportIndex({ to, from }: TransportVector): number;
} & Record<never, any> & Vue>;
declare const wormhole: import("vue/types/vue").CombinedVueInstance<{
    transports: Transports;
    targets: VMRegister;
    sources: VMRegister;
    trackInstances: boolean;
} & {
    open(transport: TransportInput): void;
    close(transport: TransportVector, force?: boolean): void;
    registerTarget(target: string, vm: Vue, force?: boolean | undefined): void;
    unregisterTarget(target: string): void;
    registerSource(source: string, vm: Vue, force?: boolean | undefined): void;
    unregisterSource(source: string): void;
    hasTarget(to: string): true;
    hasSource(to: string): true;
    hasContentFor(to: string): boolean;
    $_getTransportIndex({ to, from }: TransportVector): number;
} & Record<never, any> & Vue, object, object, object, Record<never, any>>;
export { wormhole };
