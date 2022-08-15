import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Endereco } from './endereco.model';
import { Estado } from './estado.model';

@Entity({ name: 'cidades' })
export class Cidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Estado, (estado) => estado.cidade)
  estado: Estado;

  @OneToMany(() => Endereco, (endereco) => endereco.cidade)
  endereco: Endereco[];
}
