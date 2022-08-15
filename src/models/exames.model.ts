import { Exclude, Transform } from 'class-transformer';
import { IsNotEmpty, IsDate } from 'class-validator';
import { IsConvenioActive } from '../validators/isConvenioActive.validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Colaborador } from './colaborador.model';
import { Convenio } from './convenio.model';
import { TipoCaracterAtendimento } from './enums/tipocaracteratendimento.enum';
import { Paciente } from './paciente.model';
import { Profissional } from './profissional.model';

@Entity({ name: 'exames' })
export class Exames {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  indicacaoClinica: string;

  @IsNotEmpty({
    message: 'Caracter de Atendimento é obrigatorio',
  })
  @Column({
    type: 'enum',
    enum: TipoCaracterAtendimento,
  })
  caracterAtendimento: number;

  @IsDate()
  @Column({ type: 'date' })
  dataRealizacao: string;

  @Column({ type: 'date', nullable: true })
  dataCancelamento: string;

  @Column({ nullable: true })
  numeroLote: number;

  @Column({ type: 'boolean', default: false })
  cancelado: boolean;

  @Exclude({
    toPlainOnly: true,
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataVinculo: Date;

  @Transform(({ value }) => {
    return { id: value.id, nome: value.nome };
  })
  @ManyToOne(() => Colaborador, (colaborador) => colaborador.exames, {
    eager: true,
    nullable: true,
  })
  colaborador: Colaborador;

  @Transform(({ value }) => {
    return { id: value.id, nome: value.nome };
  })
  @ManyToOne(() => Profissional, (profissional) => profissional.exames, {
    eager: true,
    nullable: false,
  })
  profissional: Profissional;

  @Transform(({ value }) => {
    return { id: value.id, nome: value.nome };
  })
  @ManyToOne(() => Paciente, (paciente) => paciente.exames, {
    eager: true,
    nullable: false,
  })
  paciente: Paciente;

  @Transform(({ value }) => {
    return { id: value.id, nome: value.nome };
  })
  @IsConvenioActive({
    message: 'Convenio está inativo',
  })
  @ManyToOne(() => Convenio, (convenio) => convenio.exames, {
    eager: true,
    nullable: false,
  })
  convenio: Convenio;
}
