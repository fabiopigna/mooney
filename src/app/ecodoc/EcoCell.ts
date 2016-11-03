import { Headers } from '@angular/http';
import { TextsJson } from './EcoDocParser';
import { EcoHeaders } from './EcoHeaders';
import { EcoHeaderT } from './EcoHeadersX';
export class EcoCell {
    y: number;
    x: number;
    text: string;
    ecoHeaders: EcoHeaders;

    constructor(ecoText: TextsJson, ecoHeaders: EcoHeaders) {
        this.x = ecoText.x;
        this.y = ecoText.y;
        this.text = ecoText.R[0].T
            .replace(/%20/g, ' ')
            .replace(/%3E/g, '>')
            .replace(/%3C/g, '<')
            .replace(/%2C/g, ',')
            .replace(/%3A/g, ':')
            .replace(/%2F/g, '/');
        this.ecoHeaders = ecoHeaders;
    }

    print(): string {
        return ' <' + this.text + '> ';
    }

    isValid(): boolean {
        return this.ecoHeaders.isValid(this.x);
    }

    isValidFor(header: EcoHeaderT): boolean {
        return header.some((headerX) => headerX === this.x);
    }
}