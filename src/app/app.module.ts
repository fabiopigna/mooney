import { EcoDocService } from './eco-doc.service';
import { ChartComponent } from './chart/line/chart.component';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MovementsComponent } from './movements/movements.component';
import { PieChartComponent } from './chart/pie/pie-chart.component';
import { CategorizeMovementsComponent } from './categorize/categorize-movements.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    PieChartComponent,
    MovementsComponent,
    CategorizeMovementsComponent
  ],
  imports: [

    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [EcoDocService],
  bootstrap: [AppComponent]
})
export class AppModule { }
