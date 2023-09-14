import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TurnirComponent } from './turnir/turnir.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { KreiranjeTurniraComponent } from './kreiranje-turnira/kreiranje-turnira.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { turnirReducer } from './shared/state/turnir/turnir.reducer';
import { CommonModule } from '@angular/common';
import { KorpaComponent } from './korpa/korpa.component';
import { korpaReducer } from './shared/state/korpa/korpa.reducer';
import { IgracComponent } from './igrac/igrac.component';
import { ProfilComponent } from './profil/profil.component';
import { igracReducer } from './shared/state/igrac/igrac.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TurnirComponent,
    HomeComponent,
    HeaderComponent,
    TurnirComponent,
    KreiranjeTurniraComponent,
    KorpaComponent,
    IgracComponent,
    ProfilComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('turniri', turnirReducer),
    StoreModule.forFeature('turniriKorpa', korpaReducer),
    StoreModule.forFeature('igraci', igracReducer),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}