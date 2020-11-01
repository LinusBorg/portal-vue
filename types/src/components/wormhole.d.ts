import { TransportsHub, TransportInput, Transport, TransportCloser, Wormhole } from '@/types';
export declare function createWormhole(): Wormhole;
export declare const wormhole: Readonly<{
    open: (t: TransportInput) => void;
    close: (t: TransportCloser) => void;
    getContentForTarget: (t: string) => Transport[];
    transports: TransportsHub;
}>;
