import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';

import { IgracService } from './igrac.service';

@Controller('igrac')
export class IgracController {
  constructor(private igracService: IgracService) {}
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Igrac)
  @Get('sviIgraci')
  async vratiSveIgrace() {
    return await this.igracService.vratiSveIgrace();
  }
  @Get('slobodniIgraciZaTurnir/:turnirId')
  async slobodniIgraciZaTurnir(@Param('turnirId') turnirId: number) {
    return await this.igracService.slobodniIgraciZaTurnir(turnirId);
  }
  // @Get('prijavljeniIgrac') //TODO hardkodirano je trenutno
  // vratiPrijavljenogIgraca() {
  //   return this.igracService.vratiPrijavljenogIgraca();
  // }
  @UseGuards(JwtAuthGuard)
  @Get('korisnickoIme/:korisnickoIme')
  async vratiIgracePoKorisnickomImenu(
    @Param('korisnickoIme') korisnickoIme: string,
  ) {
    return await this.igracService.vratiIgracePoKorisnickomImenu(korisnickoIme);
  }

  @Post('registrujIgraca')
  async post(@Body() igrac: any) {
    return await this.igracService.registrujIgraca(igrac);
  }
  @UseGuards(JwtAuthGuard)
  @Get('dohvatiIgraca/:korisnickoIme')
  async dohvatiIgraca(@Param('korisnickoIme') korisnickoIme: string) {
    return this.igracService.dohvatiIgraca(korisnickoIme);
  }
  // @UseGuards(JwtAuthGuard)
  // @Get('vratiIgracaIzTokena')
  // vratiIgracaIzTokena(@Headers('authorization') authorization: string) {
  //   if (authorization) {
  //     //const token = authorization.replace('Bearer ', ''); // Uklonimo "Bearer " prefiks
  //     return this.igracService.vratiIgracaIzTokena(authorization); // Prosleđujemo token servisu
  //   } else {
  //     // Nema tokena u zaglavlju, obradite to kako želite
  //     return null;
  //   }
  // }

  @Get('pronadjiIgraceZaPrijavu/:id')
  async pronadjiIgraceZaPrijavu(@Param('id') id: number) {
    return await this.igracService.pronadjiIgraceZaPrijavu(id);
  }
  @Get('findOne/:username')
  findOne(@Param('username') username: string) {
    return this.igracService.findOne(username);
  }
}
