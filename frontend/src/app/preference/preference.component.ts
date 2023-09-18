import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { dodajPreferenceUPrijavu } from '../shared/state/prijava/prijava.actions';
import { map } from 'rxjs';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css'],
})
export class PreferenceComponent {
  potrebanBrojSlusalica: number = 0;
  potrebanBrojRacunara: number = 0;
  potrebanBrojTastatura: number = 0;
  potrebanBrojMiseva: number = 0;
  constructor(private store: Store) {}
  potvrdiPreference() {
    this.store.dispatch(
      dodajPreferenceUPrijavu({
        potrebanBrojSlusalica: this.potrebanBrojSlusalica,
        potrebanBrojRacunara: this.potrebanBrojRacunara,
        potrebanBrojTastatura: this.potrebanBrojTastatura,
        potrebanBrojMiseva: this.potrebanBrojMiseva,
      })
    );
  }
}