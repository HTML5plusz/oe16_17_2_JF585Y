import { Component } from '@angular/core';
import { ChampionshipService } from './championships/championship.service';
import { ChampionshipDetailGuard } from './championships/championship-guard.service';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChampionshipService, SharedService]
})
export class AppComponent {
  pageTitle : string = 'AppComponent';
}
