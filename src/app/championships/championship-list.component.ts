import { Component, OnInit } from '@angular/core';
import { IChampionship } from './championship';
import { ChampionshipService } from './championship.service';

@Component({
    templateUrl: 'championship-list.component.html',
    styleUrls: ['../app.component.css']
})
export class ChampionshipListComponent implements OnInit {
    pageTitle: string = 'Championship list';
    championships: IChampionship[];
    errorMessage: string;

    constructor(private _champService: ChampionshipService) {
    }

    ngOnInit(): void {
        this._champService.getChampionships()
            .subscribe(champs => this.championships = champs,
                error => this.errorMessage = <any>error);
    }

    
}
