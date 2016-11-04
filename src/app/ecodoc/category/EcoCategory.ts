import { EcoDocDataMiner } from '../EcoDocDataMiner';
export class EcoCategory {

    name: string;
    child: EcoCategory;

    constructor(name: string, child?: EcoCategory) {
        this.name = name;
        this.child = child;
    }
    isEmpty(): boolean {
        return this === EcoDocDataMiner.emptyCategory;
    }

    getName(level: number): string {
        if (level === 1 || !this.child) {
            return this.name;
        }
        return this.name + ' ' + this.child.getName(level - 1);
    }
}