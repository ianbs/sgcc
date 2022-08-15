import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cidade } from './cidade.model';

@Entity({ name: 'estado' })
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sigla: string;

  @OneToMany(() => Cidade, (cidade) => cidade.estado)
  cidade: Cidade[];
}
