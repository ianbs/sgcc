import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cidade } from './cidade.model';
import { Colaborador } from './colaborador.model';
import { TipoEndereco } from './enums/tipoendereco.enum';
import { Paciente } from './Paciente.model';
import { Profissional } from './profissional.model';

@Entity({ name: 'enderecos' })
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column()
  cep: string;

  @Column()
  bairro: string;

  @Column()
  complemento: string;

  @Column({
    type: 'enum',
    enum: TipoEndereco,
  })
  tipoEndereco: number;

  @ManyToOne(() => Colaborador, (colaborador) => colaborador.enderecos)
  colaborador: Colaborador;

  @ManyToOne(() => Profissional, (profissional) => profissional.enderecos)
  profissional: Profissional;

  @ManyToOne(() => Paciente, (paciente) => paciente.enderecos)
  paciente: Paciente;

  @ManyToOne(() => Cidade, (cidade) => cidade.endereco)
  cidade: Cidade;
}
