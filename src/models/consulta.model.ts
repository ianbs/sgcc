import { Exclude, Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsConvenioActive } from 'src/validators/isConvenioActive.validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Colaborador } from './colaborador.model';
import { Convenio } from './convenio.model';
import { TipoCaracterAtendimento } from './enums/tipocaracteratendimento.enum';
import { TipoConsulta } from './enums/tipoconsulta.enum';
import { TipoIndicacaoAcidente } from './enums/tipoindicacaoacidente.enum';
import { Paciente } from './paciente.model';
import { Profissional } from './profissional.model';

@Entity({ name: 'consultas' })
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({
    message: 'Tipo de Consulta é obrigatorio',
  })
  @Column({
    type: 'enum',
    enum: TipoConsulta,
  })
  tipoConsulta: number;

  @Column({
    type: 'enum',
    enum: TipoIndicacaoAcidente,
    nullable: true,
  })
  indicacaoAcidente: number;

  @IsNotEmpty({
    message: 'Caracter de Atendimento é obrigatorio',
  })
  @Column({
    type: 'enum',
    enum: TipoCaracterAtendimento,
  })
  caracterAtendimento: number;

  @Column({ type: 'boolean', default: false })
  atendimentoRecemNascido: boolean;

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
  @ManyToOne(() => Colaborador, (colaborador) => colaborador.consultas, {
    eager: true,
    nullable: true,
  })
  colaborador: Colaborador;

  @Transform(({ value }) => {
    return { id: value.id, nome: value.nome };
  })
  @ManyToOne(() => Profissional, (profissional) => profissional.consultas, {
    eager: true,
    nullable: true,
  })
  profissional: Profissional;

  @Transform(({ value }) => {
    return { id: value.id, nome: value.nome };
  })
  @ManyToOne(() => Paciente, (paciente) => paciente.consultas, {
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
  @ManyToOne(() => Convenio, (convenio) => convenio.consultas, {
    eager: true,
    nullable: false,
  })
  convenio: Convenio;
}
