import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';

import { IgracService } from './igrac.service';
import { IgracGuard } from 'src/auth/igrac.role.guard';
import { IgracEntity } from './igrac.entity';

@Controller('igrac')
export class IgracController {
  constructor(private igracService: IgracService) {}
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Igrac)
  @Get('sviIgraci')
  async vratiSveIgrace() {
    return await this.igracService.vratiSveIgrace();
  }
  @UseGuards(JwtAuthGuard, IgracGuard) //!vodja
  @Get('slobodniIgraciZaTurnir/:turnirId')
  async slobodniIgraciZaTurnir(@Param('turnirId') turnirId: number) {
    return await this.igracService.slobodniIgraciZaTurnir(turnirId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('korisnickoIme/:korisnickoIme')
  async igraciSaSlicnimKorisnickimImenom(
    @Param('korisnickoIme') korisnickoIme: string,
  ) {
    return await this.igracService.igraciSaSlicnimKorisnickimImenom(
      korisnickoIme,
    );
  }

  @Post('registrujIgraca')
  async post(@Body() igrac: IgracEntity) {
    return await this.igracService.registrujIgraca(igrac);
  }
  @UseGuards(JwtAuthGuard)
  @Get('dohvatiIgraca/:korisnickoIme')
  async dohvatiIgraca(@Param('korisnickoIme') korisnickoIme: string) {
    return this.igracService.dohvatiIgraca(korisnickoIme);
  }
  @UseGuards(JwtAuthGuard, IgracGuard)
  @Put('izmeniPodatkeOIgracu')
  async izmeniPodatkeOIgracu(@Body() igrac: IgracEntity) {
    return this.igracService.izmeniPodatkeOIgracu(igrac);
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
  @Get('vratiIgraceIzIstogTima/:turnirId/:igracId')
  vratiIgraceIzIstogTima(
    @Param('turnirId') turnirId: number,
    @Param('igracId') igracId: number,
  ) {
    return this.igracService.vratiIgraceIzIstogTima(turnirId, igracId);
  }
}
