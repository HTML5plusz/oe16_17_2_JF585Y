import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChampionshipListComponent } from './championships/championship-list.component';
import { ChampionshipDetailComponent } from './championships/championship-detail.component';
import { ChampionshipDetailGuard } from './championships/championship-guard.service';

import { SharedAddComponent } from './shared/shared-add.component';
import { SharedService } from './shared/shared.service';

@NgModule({
    declarations: [
        AppComponent,
        ChampionshipListComponent,
        ChampionshipDetailComponent,
        SharedAddComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot([
            { path: 'championships', component: ChampionshipListComponent },
            { path: 'championship/:id', component: ChampionshipDetailComponent, canActivate: [ChampionshipDetailGuard] },
            { path: 'addtype', component: SharedAddComponent },
            { path: '', redirectTo: 'championships', pathMatch: 'full' },
            { path: '**', redirectTo: 'championships', pathMatch: 'full' }
          ])
    ],
    providers: [ChampionshipDetailGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
