import { EcoDocService } from './eco-doc.service';
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

  constructor(private ecoDocService: EcoDocService) {

  }

  ngOnInit(): void {
    this.ecoDocService.parseFromServer();
  }

}

