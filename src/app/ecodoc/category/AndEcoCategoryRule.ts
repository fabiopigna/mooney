import { EcoEntry } from '../EcoEntry';
import { EcoCategory } from './EcoCategory';
import { IEcoCategoryRule } from './IEcoCategoryRule';
export class AndEcoCategoryRule implements IEcoCategoryRule {

    wordsToContains: string[];
    category: EcoCategory;

    constructor(category: EcoCategory, wordsToContains: string[]) {
        this.category = category;
        this.wordsToContains = wordsToContains;
    }

    tryToCategorize(entry: EcoEntry): void {
        let canCategorize = this.wordsToContains.every(word => {
            return entry.descrizione.indexOf(word) !== -1;
        });
        if (canCategorize) {
            entry.addCategory(this.category);
        }

    }

}