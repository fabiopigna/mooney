import { EcoDocDataMiner } from './ecodoc/EcoDocDataMiner';
import { Http, Response } from '@angular/http';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { EcoDoc, EcoDocParser } from './ecodoc/EcoDocParser';
import { TEcoDocResponse } from './ecodoc/TEcoDocResponse';
@Injectable()
export class EcoDocService {

    ecoDocSubject: BehaviorSubject<EcoDoc>;

    constructor(private http: Http) {
        this.ecoDocSubject = new BehaviorSubject<EcoDoc>(this.getEmptyEcoDoc());
    }

    parseFromServer(): void {
        this.http.get('/json')
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe(response => this.parsePDF(response));
    }

    getEcoDocParsed(): EcoDoc {
        return this.ecoDocSubject.getValue();
    }

    onEcoDocParsed(subscriber: (ecoDoc: EcoDoc) => void): Subscription {
        return this.ecoDocSubject.subscribe(subscriber);
    }

    private parsePDF(response: TEcoDocResponse[]) {
        let ecoDocParser = new EcoDocParser();
        let ecoDoc = new EcoDocDataMiner(ecoDocParser.parse(response)).categorize();
        this.ecoDocSubject.next(ecoDoc);
    }

    private extractData(res: Response): TEcoDocResponse[] {
        let body = res.json();
        return body;
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private getEmptyEcoDoc(): EcoDoc {
        return {
            movements: [],
            count: 0,
            total: 0,
            entries: [],
            saldoIniziale: 0
        };
    }
}