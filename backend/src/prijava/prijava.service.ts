import { Injectable } from '@nestjs/common';
import { PrijavaEntity } from './prijava.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TurnirEntity } from 'src/turnir/turnir.entity';
import { IgracEntity } from 'src/igrac/igrac.entity';

@Injectable()
export class PrijavaService {
  constructor(
    @InjectRepository(PrijavaEntity)
    private prijavaRepository: Repository<PrijavaEntity>,
    @InjectRepository(TurnirEntity)
    private turnirRepository: Repository<TurnirEntity>,
    @InjectRepository(IgracEntity)
    private igracRepository: Repository<IgracEntity>,
  ) {}
  async vratiPrijavuPoId(id: number) {
    return this.prijavaRepository.findOne({ where: { id: id } });
  }
  async dodajPrijavu(prijava: PrijavaEntity) {
    const novaPrijava: PrijavaEntity = this.prijavaRepository.create();
    novaPrijava.nazivTima = prijava.nazivTima;
    novaPrijava.potrebanBrojMiseva = prijava.potrebanBrojMiseva;
    novaPrijava.potrebanBrojRacunara = prijava.potrebanBrojRacunara;
    novaPrijava.potrebanBrojSlusalica = prijava.potrebanBrojSlusalica;
    novaPrijava.potrebanBrojTastatura = prijava.potrebanBrojTastatura; //cek cek
    const noviTurnir = await this.turnirRepository.findOne({
      where: { id: prijava.turnir.id },
    });
    console.log('turnir iz prijave je' + noviTurnir.naziv);
    novaPrijava.turnir = noviTurnir;
    novaPrijava.igraci = prijava.igraci;
    // novaPrijava.igraci = [];
    // prijava.igraci.forEach(async (igracUPrijavi) => {
    //   const igrac = await this.igracRepository.findOne({
    //     where: { id: igracUPrijavi.id },
    //   });
    //   novaPrijava.igraci.push(igrac);
    //   console.log(igrac.korisnickoIme);
    // });
    return await this.prijavaRepository.save(novaPrijava);
    // return await this.prijavaRepository.save(novaPrijava);
  }
  async vratiPrijaveZaTurnir(turnirId) {
    const turnir = this.turnirRepository.findOne({ where: { id: turnirId } });
    if (!turnir) return null;
  }
}
