import Vue from 'vue';
import { Transports, TransportInput, TransportVector, StringBoolMap } from '@/types';
export declare const Wormhole: import("vue").VueConstructor<{
    transports: Transports;
    targets: StringBoolMap;
    sources: StringBoolMap;
} & {
    open(transport: TransportInput): void;
    close(transport: TransportVector, force?: boolean): void;
    registerTarget(target: string, force?: boolean | undefined): void;
    unregisterTarget(target: string): void;
    registerSource(source: string, force?: boolean | undefined): void;
    unregisterSource(source: string): void;
    hasTarget(to: string): boolean;
    hasSource(to: string): boolean;
    $_getTransportIndex({ to, from }: TransportVector): number;
} & Record<never, any> & Vue>;
declare const wormhole: import("vue/types/vue").CombinedVueInstance<{
    transports: Transports;
    targets: StringBoolMap;
    sources: StringBoolMap;
} & {
    open(transport: TransportInput): void;
    close(transport: TransportVector, force?: boolean): void;
    registerTarget(target: string, force?: boolean | undefined): void;
    unregisterTarget(target: string): void;
    registerSource(source: string, force?: boolean | undefined): void;
    unregisterSource(source: string): void;
    hasTarget(to: string): boolean;
    hasSource(to: string): boolean;
    $_getTransportIndex({ to, from }: TransportVector): number;
} & Record<never, any> & Vue, object, object, object, Record<never, any>>;
export { wormhole };
