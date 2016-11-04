import { EcoCategory } from '../ecodoc/category/EcoCategory';
import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { EcoDoc } from '../ecodoc/EcoDocParser';
@Component({
    selector: 'movements-list',
    templateUrl: './movements.component.html',
    styleUrls: ['./movements.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MovementsComponent implements OnChanges {

    @Input()
    ecoDoc: EcoDoc;

    public gridData: GridData = { columns: 0, tiles: [] };

    constructor() { }

    ngOnChanges(): void {
        this.gridData = this.handleData(this.ecoDoc);
        // this.barChar(chartData)

    }

    private handleData(ecoDoc: EcoDoc): GridData {
        let gridData = new GridData();

        gridData.tiles = ecoDoc.entries.reduce((tiles, entry) => {
            tiles.push(new GridTile('lightblue', entry.data.toLocaleDateString()));
            tiles.push(new GridTile('lightpink', entry.movDare !== 0 ? entry.movDare.toFixed(2) : ''));
            tiles.push(new GridTile('lightgreen', entry.movAvere !== 0 ? entry.movAvere.toFixed(2) : ''));
            tiles.push(new GridTile('lightgray', entry.descrizione, 5));
            tiles.push(new GridTile('lightsalmon', this.categoryToString(entry.category), 2));
            return tiles;

        }, []);
        return gridData;
    }

    categoryToString(category: EcoCategory): string {
        if (category && !category.isEmpty()) {
            return category.name + ' ' + this.categoryToString(category.child);
        }
        return '';
    }
}

export class GridTile {
    text: string;
    cols: number;
    rows: number;
    color: string;

    constructor(color: string, text: string, cols = 1, rows = 1) {
        this.color = color;
        this.text = text;
        this.cols = cols;
        this.rows = rows;
    }
}

export class GridData {

    columns: number;
    tiles: GridTile[];
}