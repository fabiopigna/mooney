import { TEcoDocResponse } from './ecodoc/TEcoDocResponse';
import { EcoDocDataMiner } from './ecodoc/EcoDocDataMiner';
import { EcoDoc, EcoDocParser } from './ecodoc/EcoDocParser';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'Mooney';
  ecoDoc: EcoDoc;

  constructor(private http: Http) {
    this.ecoDoc = this.getEmptyEcoDoc();
  }

  ngOnInit(): void {
    this.http.get('/json')
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(response => this.parsePDF(response));
  }

  private parsePDF(response: TEcoDocResponse[]) {
    let ecoDocParser = new EcoDocParser();
    this.ecoDoc = new EcoDocDataMiner(ecoDocParser.parse(response)).categorize();

  }

  private extractData(res: Response): TEcoDocResponse[] {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
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

