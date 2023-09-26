import { Injectable, NotFoundException } from '@nestjs/common';
import { IgracEntity } from './igrac.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';

@Injectable()
export class IgracService {
  constructor(
    @InjectRepository(IgracEntity)
    private igracRepository: Repository<IgracEntity>,
    @InjectRepository(PrijavaEntity)
    private prijavaRepository: Repository<PrijavaEntity>,
    @InjectRepository(TurnirEntity)
    private turnirRepository: Repository<TurnirEntity>,
  ) {}

  async vratiSveIgrace() {
    return await this.igracRepository.find();
  }
  vratiPrijavljenogIgraca() {
    return {
      id: 3,
      korisnickoIme: 'ludjakat',
      ime: 'Petar',
      prezime: 'Mancic',
      vodjaTima: false,
    };
  }
  async vratiIgracePoKorisnickomImenu(korisnickoIme: string) {
    return await this.igracRepository.find({
      where: {
        korisnickoIme: Like(`%${korisnickoIme}%`),
      },
    });
  }

  async dodajIgraca(igrac: any) {
    const p = this.igracRepository.create();
    p.korisnickoIme = igrac.korisnickoIme;
    p.ime = igrac.ime;
    p.prezime = igrac.prezime; //cek, to je taj json sto je consol logovan od front
    // A kkvo s front da posaljemo? kako mislis //cek da ti stavim sve na1 sdesktop
    p.vodjaTima = igrac.vodjaTima;
    return await this.igracRepository.save(p);
  }
  async pronadjiIgraceZaPrijavu(prijavaId: number) {
    const prijava = await this.prijavaRepository.findOne({
      where: { id: prijavaId },
    });

    if (!prijava) {
      console.log('ne opstoji prijava sa tim id');
      return [];
    }
    const igraci = await this.igracRepository.find({
      where: {
        prijave: [prijava],
      },
    });
    return igraci;
  }
  async prijavljeniIgraciNaTurniru(turnirId: number) {
    const turnir = await this.turnirRepository.findOne({
      where: { id: turnirId },
    });
    const prijava = await this.prijavaRepository.findOne({
      where: { id: turnirId },
    });
    console.log(prijava);
    console.log(turnir);
    let trazenaPrijava: PrijavaEntity = new PrijavaEntity();
    turnir.prijave.forEach((prijava) => {
      if (prijava.turnir.id === turnirId) {
        trazenaPrijava = prijava;
      }
    });
    return trazenaPrijava.igraci;
  }
}
