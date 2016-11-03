import { ChartComponent } from './chart/chart.component';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MovementsComponent } from './movements/movements.component';
import { PieChartComponent } from './chart/pie/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    PieChartComponent,
    MovementsComponent
  ],
  imports: [

    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
