import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IChampionship } from './championship';

@Injectable()
export class ChampionshipService {
    private _baseUrl = 'http://94.177.230.203:8080/sport/rest/championship/';

    constructor(private _http: Http) { }

    getChampionships() : Observable<IChampionship[]> {
        return this._http.get(this._baseUrl + 'entity/all')
            .map((response: Response) => <IChampionship[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getChampionship(id: number): Observable<IChampionship> {
        if(id === 0) {
            return Observable.of(this.initializeChamp());
        };
        return this._http.get(`${this._baseUrl}${id}`)
            //.map(this.extractData)
            .map((response: Response) => <IChampionship>response.json())
            .do(data => console.log('Champ: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    saveChampionship(champ: IChampionship): Observable<IChampionship> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (champ.id === 0) {
            return this.createChampionship(champ, options);
        }
        //return this.updateChampionship(champ, options);
    }

    private createChampionship(champ: IChampionship, options: RequestOptions): Observable<IChampionship> {
        champ.id = undefined;
        return this._http.post(`${this._baseUrl}save`, champ, options)
            .map(this.extractData)
            .do(data => console.log('createProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    /*private updateChampionship(champ: IChampionship, options: RequestOptions): Observable<IChampionship> {
        const url = `${this._baseUrl}/${champ.id}`;
        return this._http.put(url, champ, options)
            .map(() => champ)
            .do(data => console.log('updateProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }*/

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeChamp(): IChampionship {
        return {
            id: 0,
            name: null,
            description: null,
            startDate: null,
            endDate: null,
        };
    }

}
