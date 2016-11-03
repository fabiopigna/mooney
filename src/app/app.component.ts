import { EcoDoc, EcoDocParser } from './ecodoc/EcoDocParser';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mooney';
  ecoDoc: EcoDoc;

  constructor(private http: Http) {
    this.ecoDoc = this.getEmptyEcoDoc();
  }

  ngOnInit(): void {
    this.http.get('app/F1040EZ.json')
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(json => this.parsePDF(json));
  }

  private parsePDF(json) {
    let ecoDocParser = new EcoDocParser();
    this.ecoDoc = ecoDocParser.parse(json);
  }

  private extractData(res: Response) {
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
