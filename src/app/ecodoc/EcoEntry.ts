
import { EcoRow } from './EcoRow';
import { EcoHeadersX } from './EcoHeadersX';
import { EcoCategory } from './category/EcoCategory';
import { EcoDocDataMiner } from './EcoDocDataMiner';
export class EcoEntry {
    data: Date;
    valuta: Date;
    movDare: number;
    movAvere: number;
    descrizione: string;
    riferimento: string;
    category: EcoCategory;

    constructor(row: EcoRow) {
        this.descrizione = row.hasCell(EcoHeadersX.Descrizione) ? row.getCell(EcoHeadersX.Descrizione) : '-';
        this.data = row.hasCell(EcoHeadersX.Data) ? row.getCellAsDate(EcoHeadersX.Data) : null;
        this.valuta = row.hasCell(EcoHeadersX.Valuta) ? row.getCellAsDate(EcoHeadersX.Valuta) : null;
        this.movDare = row.hasCell(EcoHeadersX.MovDare) ? -row.getCellAsNumber(EcoHeadersX.MovDare) : 0;
        this.movAvere = row.hasCell(EcoHeadersX.MovAvere) ? row.getCellAsNumber(EcoHeadersX.MovAvere) : 0;
        this.category = EcoDocDataMiner.emptyCategory;
    }

    addDescription(row: EcoRow): void {
        this.descrizione += ' ' + row.getCell(EcoHeadersX.Descrizione);
    }

    addCategory(category: EcoCategory): void {
        this.category = category;
    }

    print(): string {
        return '' + this.data.toLocaleDateString() + ' --- ' +
            this.valuta.toLocaleDateString() + ' --- ' +
            this.movAvere + ' --- ' +
            this.movDare + ' --- ' +
            this.descrizione + '';
    }
}