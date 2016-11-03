import { EcoDoc } from '../../ecodoc/EcoDocParser';
import { EcoEntry } from '../../ecodoc/EcoEntry';
import { Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnChanges {

    @Input()
    ecoDoc: EcoDoc;

    constructor(private el: ElementRef) { }

    ngOnChanges(): void {
        let chartData = this.handleData(this.ecoDoc);
        this.pieChart(chartData);
    }

    handleData(ecoDoc: EcoDoc): EcoChartEntry[] {
        let progressive = ecoDoc.saldoIniziale;
        return ecoDoc.entries.map((entry) => {
            let chartEntry = new EcoChartEntry();
            chartEntry.date = entry.data;
            chartEntry.value = Math.abs(entry.movDare);
            chartEntry.label = entry.descrizione;
            return chartEntry;
        });

    }


    pieChart(chartEntries: EcoChartEntry[]): void {

        let width = 360;
        let height = 360;
        let radius = Math.min(width, height) / 2;
        let color = d3.scaleOrdinal(d3.schemeCategory20b);
        let svg = d3.select("#pie-chart")
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) +
            ',' + (height / 2) + ')');
        let arc = d3.arc<d3.PieArcDatum<EcoChartEntry>>()
            .innerRadius(0)
            .outerRadius(radius);
        let labelArc = d3.arc<d3.PieArcDatum<EcoChartEntry>>()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);
        let pie = d3.pie<EcoChartEntry>()
            .value((d) => d.value)
            .sort(null);
        let block = svg.selectAll('path')
            .data(pie(chartEntries))
            .enter();
        block.append('path')
            .attr('d', arc)
            .attr('fill', (d) => color(d.data.label))
            .on("mouseover", (d) => {
                svg.append("text")
                    .attr("dy", ".5em")
                    .style("text-anchor", "middle")
                    .style("font-size", 45)
                    .attr("class", "label")
                    .style("fill", function (d, i) { return "black"; })
                    .text(d.data.label);

            })
            .on("mouseout", function (d) {
                svg.select(".label").remove();
            });
        // block.append("text")
        //     .attr("transform", (d) => "translate(" + labelArc.centroid(d) + ")")
        //     .attr("dy", ".35em")
        //     .text((d) => d.data.value);
    }
}

export class EcoChartEntry {
    date: Date;
    value: number;
    label: string;
}