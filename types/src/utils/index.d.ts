import { VNode } from 'vue';
import { Transport } from '../types';
export declare function freeze<R>(item: R[]): ReadonlyArray<R>;
export declare function combinePassengers(transports: Transport[], slotProps?: {}): Array<VNode>;
export declare function stableSort<T>(array: T[], compareFn: Function): T[];
