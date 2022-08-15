import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consulta } from './consulta.model';
import { Endereco } from './endereco.model';
import { TipoSexo } from './enums/tiposexo.enum';
import { Exames } from './exames.model';

@Entity({ name: 'pacientes' })
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({
    message: 'Nome do paciente é obrigatorio',
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

  @Column({ nullable: true })
  cartaoNacionalSaude: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCadastro: Date;

  @OneToMany(() => Endereco, (endereco) => endereco.paciente, {
    cascade: true,
    eager: true,
  })
  enderecos: Endereco[];

  @OneToMany(() => Consulta, (consulta) => consulta.paciente)
  consultas: Consulta[];

  @OneToMany(() => Exames, (exames) => exames.paciente)
  exames: Exames[];
}
