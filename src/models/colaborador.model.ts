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

@Entity({ name: 'colaboradores' })
export class Colaborador {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({
    message: 'Nome do colaborador é obrigatorio',
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

  @Column({ type: 'date' })
  dataNascimento: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataVinculo: Date;

  @OneToOne(() => Usuario, (usuario) => usuario.colaborador, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  usuario: Usuario;

  @OneToMany(() => Endereco, (endereco) => endereco.colaborador, {
    cascade: true,
    eager: true,
  })
  enderecos: Endereco[];

  @OneToMany(() => Consulta, (consulta) => consulta.colaborador)
  consultas: Consulta[];

  @OneToMany(() => Exames, (exames) => exames.colaborador)
  exames: Exames[];
}
