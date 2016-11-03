import { EcoHeaders } from './EcoHeaders';
import { EcoCell } from './EcoCell';
import { EcoHeaderT } from './EcoHeadersX';

export class EcoRow {

    cells: EcoCell[];

    constructor() {
        this.cells = [];
    }

    isMyCell(cell: EcoCell): boolean {
        return this.cells.every(storedCell => storedCell.y === cell.y);
    }

    addCell(cell: EcoCell): void {
        this.cells.push(cell);
    }

    hasCell(header: EcoHeaderT): boolean {
        return this.cells.some(cell => cell.isValidFor(header));
    }

    getCell(header: EcoHeaderT): string {
        return this.cells.find(cell => cell.isValidFor(header)).text;
    }

    getCellAsNumber(header: EcoHeaderT): number {
        return Number.parseFloat(this.getCell(header).replace(/\./g, '').replace(/,/g, '.'));
    }

    getCellAsDate(header: EcoHeaderT): Date {
        let st = this.getCell(header);
        let pattern = /(\d{2})\.(\d{2})\.(\d{2})/;
        return new Date(st.replace(pattern, '$2.$1.$3'));
    }

    print(): string {
        return this.cells.reduce((s, cell) => s + cell.print(), '');
    }

}
