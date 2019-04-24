import { VNode } from 'vue';
import { Transport } from '../types';
export declare const inBrowser: boolean;
export declare function freeze<R>(item: R[]): ReadonlyArray<R>;
export declare function combinePassengers(transports: Transport[], slotProps?: {}): Array<VNode>;
export declare function stableSort<T>(array: T[], compareFn: Function): T[];
export declare function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
