import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IChampionship } from './championship';
import { ChampionshipService } from './championship.service';

@Component({
    moduleId: module.id,
    templateUrl: 'championship-detail.component.html'
})
export class ChampionshipDetailComponent implements OnInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    private sub: Subscription; 

    pageTitle: string = 'Championship';
    championship: IChampionship;
    errorMessage: string;
    champForm: FormGroup;

    constructor(private fb: FormBuilder,
                private _route: ActivatedRoute,
                private _router: Router,
                private _champService: ChampionshipService) { }
        
    ngOnInit(): void {
        let id = +this._route.snapshot.params['id'];
        this.pageTitle += `: ${id}`;

        this._champService.getChampionship(id)
            .subscribe(champ => this.championship = champ,
            error => this.errorMessage = <any>error);

        this.champForm = this.fb.group({
            name: ['', [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]],
            startDate: '',
            endDate: '',
            description: ''
        });

        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getChamp(id);
            }
        );

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /*ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    }*/

    onBack(): void {
        this._router.navigate(['/championships']);
    }

    getChamp(id: number): void {
        this._champService.getChampionship(id)
            .subscribe(
            (champ: IChampionship) => this.onChampRetrieved(champ),
            (error: any) => this.errorMessage = <any>error
            );
    }

    onChampRetrieved(champ: IChampionship): void {
        if (this.champForm) {
            this.champForm.reset();
        }
        this.championship = champ;

        if (this.championship.id === 0) {
            this.pageTitle = 'Add Championship';
        } else {
            this.pageTitle = `Edit Championship: ${this.championship.name}`;
        }

        this.champForm.patchValue({
            name: this.championship.name,
            description: this.championship.description,
            startDate: this.championship.startDate,
            endDate: this.championship.endDate
        });
    }

    saveChamp(): void {
        if (this.champForm.dirty && this.champForm.valid) {
            let p = Object.assign({}, this.championship, this.champForm.value);

            this._champService.saveChampionship(p)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.champForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.champForm.reset();
        this._router.navigate(['/championships']);
    }
    
}
