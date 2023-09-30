import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as KorisnikActions from '../shared/state/korisnik/korisnik.actions';
import { IgracService } from '../services/igrac/igrac.service';
import { Observable, map } from 'rxjs';
import { Igrac } from '../shared/models/igrac';
import { Organizator } from '../shared/models/organizator';
import { selectPrijavljeniKorisnik } from '../shared/state/korisnik/korisnik.selector';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    new Observable();
  constructor(
    private igracService: IgracService,
    private router: Router,
    private store: Store
  ) {
    this.trenutnoPrijavljeniKorisnik$ = this.store
      .select(selectPrijavljeniKorisnik)
      .pipe(map((p: any) => p?.prijavljeniKorisnik));
  }
  //todo prebaci u navbar
  navigirajNaKreiranjeTurnira() {
    this.router.navigateByUrl('kreiranjeTurnira');
  }
  navigirajNaPocetnu() {
    this.router.navigateByUrl('');
  }
  navigirajNaProfil() {
    this.router.navigateByUrl('profil');
  }
  navigirajNaLogin() {
    this.router.navigateByUrl('login');
  }
  OdjaviSe() {
    this.store.dispatch(KorisnikActions.odjaviPrijavljenogKorisnika());
    this.router.navigateByUrl('');
  }
  navigirajNaPrijavu() {
    this.router.navigateByUrl('prijava');
  }
  navigirajNaRegistraciju() {
    this.router.navigateByUrl('registracija');
  }
}
