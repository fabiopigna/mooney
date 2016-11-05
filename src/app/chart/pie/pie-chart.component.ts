import { Subscription } from 'rxjs/Rx';

import { EcoDoc } from '../../ecodoc/EcoDocParser';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { EcoCategory } from '../../ecodoc/category/EcoCategory';
import { EcoDocService } from '../../eco-doc.service';
import { OnChanges } from '@angular/core';


@Component({
    selector: 'pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit, OnDestroy {

    @Output()
    selected: EventEmitter<EcoChartEntry>;
    entry: EcoChartEntry;
    subscription: Subscription;

    constructor(private ecoDocService: EcoDocService) {
        this.selected = new EventEmitter<EcoChartEntry>();

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngOnInit(): void {
        this.subscription = this.ecoDocService.onEcoDocParsed((ecoDoc) => this.loadData(ecoDoc));
        this.loadData(this.ecoDocService.getEcoDocParsed());
    }

    loadData(ecoDoc: EcoDoc): void {
        let chartData = this.handleData(ecoDoc);
        this.pieChart(chartData);
    }

    handleData(ecoDoc: EcoDoc): EcoChartEntry[] {
        return ecoDoc.entries.reduce((result, entry) => {
            if (!result.hasEntryByCategory(entry.category)) {
                result.newEntryByCategory(entry.category);
            }
            let chartCategoryEntry = result.getEntryByCategory(entry.category);
            let chartEntry = new EcoChartEntry();
            chartEntry.label = entry.descrizione;
            chartEntry.valueString = entry.movDare.toFixed(2);

            chartCategoryEntry.entries.push(chartEntry);
            chartCategoryEntry.value += Math.abs(entry.movDare);
            chartCategoryEntry.valueString = chartCategoryEntry.value.toFixed(2);
            return result;

        }, new EcoCategoryContainer()).entries;

    }


    pieChart(chartEntries: EcoChartEntry[]): void {

        let color = d3.scaleOrdinal(d3.schemeCategory20b);
        let width = 400,
            height = 400,
            radius = Math.min(width, height) / 2.5;
        let labelr = radius + 20;

        let svg = d3.select("#pie-chart")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
            .attr('preserveAspectRatio', 'xMinYMin')
            .append("g")
            .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

        let arc = d3.arc<d3.PieArcDatum<EcoChartEntry>>()
            .innerRadius(radius - 100)
            .outerRadius(radius - 10);
        let pie = d3.pie<EcoChartEntry>()
            .value((d) => d.value)
            .sort((d0, d1) => d0.label.localeCompare(d1.label));
        let block = svg.selectAll('path')
            .data(pie(chartEntries))
            .enter()
            .append("g")
            .attr("class", "arc");
        block.append('path')
            .attr('d', arc)
            .attr('fill', (d) => color(d.data.color))
            .on("mouseover", (d) => {
                this.selected.emit(d.data);
                this.entry = d.data;
            })
            .on("mouseout", (d) => {

            });
        block.append("text")
            .attr("transform", (d) => {
                let c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    // pythagorean theorem for hypotenuse
                    h = Math.sqrt(x * x + y * y);
                return "translate(" + (x / h * labelr) + ',' +
                    (y / h * labelr) + ")";
            })
            .attr("dy", ".35em")
            .attr("text-anchor", (d) => {
                // are we past the center?
                return (d.endAngle + d.startAngle) / 2 > Math.PI ?
                    "end" : "start";
            })
            .text((d) => d.data.label);

    }
}

export class EcoCategoryContainer {

    entries: EcoChartEntry[];

    constructor() {
        this.entries = [];
    }
    newEntryByCategory(category: EcoCategory): void {
        let entry = new EcoChartEntry();
        entry.value = 0;
        entry.label = category.getName(2);
        entry.color = category.getName(2);
        this.entries.push(entry);
    }
    getEntryByCategory(category: EcoCategory): EcoChartEntry {
        return this.entries.find(entry => entry.label === category.getName(2));

    }
    hasEntryByCategory(category: EcoCategory): boolean {
        return this.entries.some(entry => entry.label === category.getName(2));
    }
}

export class EcoChartEntry {
    entries: EcoChartEntry[] = [];
    value: number;
    color: string;
    label: string;
    valueString: string;
}