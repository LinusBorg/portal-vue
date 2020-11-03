import { TransportsHub, TransportInput, Transport, TransportCloser, Wormhole, Name } from '@/types';
export declare function createWormhole(asReadonly?: boolean): Wormhole;
export declare const wormhole: Readonly<{
    open: (t: TransportInput) => void;
    close: (t: TransportCloser) => void;
    getContentForTarget: (t: Name) => Transport[];
    transports: TransportsHub;
}>;
