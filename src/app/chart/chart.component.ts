import { EcoDoc } from '../ecodoc/EcoDocParser';
import { EcoEntry } from '../ecodoc/EcoEntry';
import { Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'line-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnChanges {
    // styles: ['.axis--x path {  display: none;}',
    //         '.line {  fill: none;  stroke: steelblue;  stroke-width: 1.5px;}']
    @Input()
    ecoDoc: EcoDoc;

    constructor(private el: ElementRef) { }

    ngOnChanges(): void {

        let chartData = this.handleData(this.ecoDoc);
        // this.barChar(chartData)
        this.lineChart(chartData);
    }

    handleData(ecoDoc: EcoDoc): EcoChartEntry[] {
        let progressive = ecoDoc.saldoIniziale;
        return ecoDoc.entries.map((entry) => {
            progressive += entry.movAvere + entry.movDare;
            let chartEntry = new EcoChartEntry();
            chartEntry.date = entry.data;
            chartEntry.value = progressive;
            return chartEntry;
        });

    }


    lineChart(chartData: EcoChartEntry[]): void {
        // parse the date / time
        let svg = d3.select("#line-chart"),
            margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        let parseTime = d3.timeParse("%d-%b-%y");

        // set the ranges
        let x = d3.scaleTime().range([0, width]);
        let y = d3.scaleLinear().range([height, 0]);

        // define the line
        let line = d3.line<EcoChartEntry>()
            .x((d) => { return x(d.date); })
            .y((d) => { return y(d.value); });


        x.domain(d3.extent(chartData, ((d: any) => d.date)));
        y.domain(d3.extent(chartData, (d) => { return d.value; }));

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .style("text-anchor", "end")
            .text("€");

        g.append("path")
            .datum(chartData)
            .attr("class", "line")
            .attr("d", line);
    }
}
export class EcoChartEntry {
    date: Date;
    value: number;
}