import { EcoHeadersX } from './EcoHeadersX';
export class EcoHeaders {
    headersX: number[][];

    constructor() {
        this.headersX = [
            EcoHeadersX.Data,
            EcoHeadersX.Valuta,
            EcoHeadersX.NoSpeseOp,
            EcoHeadersX.MovDare,
            EcoHeadersX.MovAvere,
            EcoHeadersX.Descrizione,
            EcoHeadersX.Riferimento];
    }

    isValid(x: number): boolean {
        // return this.headersX.some(headerX => ((headerX - 0.5) < x && x < (headerX + 0.5)));
        return this.headersX.some(headerX => (headerX.some(hx => hx === x)));
    }
}