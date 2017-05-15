import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { INameDesc } from './name-description';
import { SharedService } from './shared.service';

@Component({
    templateUrl: './shared-add.component.html'
})
export class SharedAddComponent implements OnInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    private sub: Subscription; 

    pageTitle: string = 'Add new type';
    nameDesc: INameDesc;
    errorMessage: string;
    sharedForm: FormGroup;
  
    types: string[] = ["Seria", "Sport", "Season", "ConditionType"];

    constructor(private fb: FormBuilder,
                private _route: ActivatedRoute,
                private _router: Router,
                private _sharedService: SharedService) { }
        
    ngOnInit(): void {
        /*let id = +this._route.snapshot.params['id'];
        this.pageTitle += `: ${id}`;*/

        /*this._champService.getChampionship(id)
            .subscribe(champ => this.championship = champ,
            error => this.errorMessage = <any>error);*/

        this.sharedForm = this.fb.group({
            entityType: ['', [Validators.required]],
            name: ['', [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]],
            description: ''
        });
    }

    saveShared(): void {
        if (this.sharedForm.dirty && this.sharedForm.valid) {
            let p = Object.assign({}, this.nameDesc, this.sharedForm.value);

            this._sharedService.saveNameDesc(p)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.sharedForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.sharedForm.reset();
        this._router.navigate(['/championships']);
    }
    
}
