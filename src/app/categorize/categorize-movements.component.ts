import { EcoDocService } from '../eco-doc.service';
import { EcoCategory } from '../ecodoc/category/EcoCategory';
import { Component, OnChanges, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { EcoDoc } from '../ecodoc/EcoDocParser';
import { Subscription } from 'rxjs/Rx';
@Component({
    selector: 'categorize-movements-list',
    templateUrl: './categorize-movements.component.html',
    styleUrls: ['categorize-movements.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CategorizeMovementsComponent implements OnInit, OnDestroy {


    private subscription: Subscription;
    public gridData: GridData = { columns: 0, tiles: [] };

    constructor(private ecoDocService: EcoDocService) {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngOnInit(): void {
        this.subscription = this.ecoDocService.onEcoDocParsed((ecoDoc) => this.loadData(ecoDoc));
        this.loadData(this.ecoDocService.getEcoDocParsed());
    }

    loadData(ecoDoc: EcoDoc): void {
        this.gridData = this.handleData(ecoDoc);
    }

    private handleData(ecoDoc: EcoDoc): GridData {
        let gridData = new GridData();

        gridData.tiles = ecoDoc.entries
            .filter((entry) => entry.category.isEmpty())
            .reduce((tiles, entry) => {
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