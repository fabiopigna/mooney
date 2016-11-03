import { EcoCell } from './EcoCell';
import { EcoHeadersX } from './EcoHeadersX';
import { EcoHeaders } from './EcoHeaders';
import { EcoRow } from './EcoRow';
import { EcoEntry } from './EcoEntry';

export class EcoDocParser {

    public parse(json): EcoDoc {
        let ecoHeaders = new EcoHeaders();
        let pages: PageJson[] = json.formImage.Pages;
        let ecoTable: EcoTable = new EcoTable();
        pages.forEach(page => {
            let ecoPage = new EcoPage(ecoHeaders);
            for (let i = 0; i < page.Texts.length; i++) {
                ecoPage.addEcoText(page.Texts[i]);
            }
            ecoTable.addPage(ecoPage);
        });
        let entries = ecoTable.mergeRows();
        let saldoIniziale = ecoTable.getSaldoIniziale();
        return new EcoDoc(saldoIniziale, entries);

        // return ecoTable.print();
    }
}


export class EcoDoc {
    movements: string[];
    count: number;
    total: number;
    entries: EcoEntry[];
    saldoIniziale: number;

    constructor(saldoIniziale: number, entries: EcoEntry[]) {
        this.saldoIniziale = saldoIniziale;
        this.entries = entries;
        this.movements = entries.map(entry => entry.print());
        this.count = entries.length;
        this.total = entries.reduce((total, entry) => {
            return 0.01 * Math.round(100 * (total + entry.movAvere + entry.movDare));
        }, 0);
    }
}





export class EcoPage {

    rows: EcoRow[];
    ecoHeaders: EcoHeaders;

    constructor(ecoHeaders: EcoHeaders) {
        this.rows = [];
        this.ecoHeaders = ecoHeaders;
    }

    addEcoText(textJSON: TextsJson): void {
        let cell = new EcoCell(textJSON, this.ecoHeaders);
        if (cell.isValid()) {
            let row = this.rows.find(lookupRow => lookupRow.isMyCell(cell));
            if (!row) {
                row = new EcoRow();
                this.rows.push(row);
            }
            row.addCell(cell);
        }
    }

    print(): string[] {
        return this.rows.map(row => row.print());
    }

}

export class EcoTable {

    pages: EcoPage[];
    constructor() {
        this.pages = [];
    }

    addPage(page: EcoPage): void {
        this.pages.push(page);
    }

    print(): string[] {
        return this.pages.reduce((r, ecoTable) => r.concat(ecoTable.print()), [])
    }

    getRows(): EcoRow[] {
        return this.pages.reduce((r, page) => {
            return r.concat(page.rows);
        }, []);
    }
    mergeRows(): EcoEntry[] {
        let rows = this.getRows();
        let entries = [];
        rows.reduce((prevEntry: EcoEntry, nextRow: EcoRow) => {
            if (nextRow.hasCell(EcoHeadersX.Descrizione)
                && !nextRow.hasCell(EcoHeadersX.Data)
                && !nextRow.hasCell(EcoHeadersX.Valuta)
            ) {
                prevEntry.appendDescription(nextRow);
                return prevEntry;
            } else if (nextRow.hasCell(EcoHeadersX.Data)
                && nextRow.hasCell(EcoHeadersX.Valuta)
            ) {
                let nextEntry = new EcoEntry(nextRow);
                entries.push(nextEntry);
                return nextEntry;
            }
            return prevEntry;

        }, null);
        return entries;
    }

    getSaldoIniziale(): number {
        for (let row of this.getRows()) {
            if (row.hasCell(EcoHeadersX.Descrizione) && row.getCell(EcoHeadersX.Descrizione) === 'SALDO INIZIALE') {
                return row.getCellAsNumber(EcoHeadersX.MovAvere);
            }
        }
        return 0;
    }
}




export type RJson = {
    T: string;

}
export type TextsJson = {
    R: RJson[];
    x: number;
    y: number;
    w: number;
}

export type PageJson = {
    Texts: TextsJson[];
}