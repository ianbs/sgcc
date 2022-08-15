import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consulta } from './consulta.model';
import { Exames } from './exames.model';

@Entity({ name: 'convenios' })
export class Convenio {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({
    message: 'Nome do convenio é obrigatorio',
  })
  @Column()
  nome: string;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataVinculo: Date;

  @OneToMany(() => Consulta, (consulta) => consulta.convenio)
  consultas: Consulta[];

  @OneToMany(() => Exames, (exames) => exames.convenio)
  exames: Exames[];
}
