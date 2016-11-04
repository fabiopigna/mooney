import { EcoEntry } from '../EcoEntry';
export interface IEcoCategoryRule {
    tryToCategorize(entry: EcoEntry): void;
}