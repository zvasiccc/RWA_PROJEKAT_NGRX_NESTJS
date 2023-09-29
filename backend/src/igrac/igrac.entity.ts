import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { Role } from 'src/roles/role.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Collection,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class IgracEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  korisnickoIme: string;
  @Column()
  lozinka: string;
  @Column()
  ime: string;
  @Column()
  prezime: string;
  @Column()
  vodjaTima: boolean;
  roles: Role;
  @ManyToMany(() => PrijavaEntity, (prijava) => prijava.igraci)
  prijave: PrijavaEntity[];
}
