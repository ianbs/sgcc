import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Consulta } from './consulta.model';
import { Endereco } from './endereco.model';
import { TipoSexo } from './enums/tiposexo.enum';
import { Exames } from './exames.model';
import { Usuario } from './usuario.model';

@Entity({ name: 'profissionais' })
export class Profissional {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({
    message: 'Nome do profissional é obrigatorio',
  })
  @Column()
  nome: string;

  @IsNotEmpty({
    message: 'CPF é obrigatorio',
  })
  @Column()
  cpf: string;

  @Column({ nullable: true })
  rg: string;

  @IsNotEmpty({
    message: 'Sexo é obrigatorio',
  })
  @Column({
    type: 'enum',
    enum: TipoSexo,
  })
  sexo: number;

  @IsNotEmpty({
    message: 'Conselho é obrigatorio',
  })
  @Column()
  conselho: string;

  @IsNotEmpty({
    message: 'Número do conselho é obrigatorio',
  })
  @Column()
  numeroConselho: string;

  @Column({ nullable: true })
  especialidade: string;

  @Column({ nullable: true })
  cbo: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataVinculo: Date;

  @Column({ type: 'date' })
  dataNascimento: string;

  @OneToOne(() => Usuario, (usuario) => usuario.profissional, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  usuario: Usuario;

  @OneToMany(() => Endereco, (endereco) => endereco.profissional, {
    cascade: true,
    eager: true,
  })
  enderecos: Endereco[];

  @OneToMany(() => Consulta, (consulta) => consulta.profissional)
  consultas: Consulta[];

  @OneToMany(() => Exames, (exames) => exames.profissional)
  exames: Exames[];
}
