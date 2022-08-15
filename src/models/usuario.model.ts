import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Colaborador } from './colaborador.model';
import { Permissoes } from './enums/permissoes.enum';
import { Profissional } from './profissional.model';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({
    message: 'Email é obrigatorio',
  })
  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty({
    message: 'Nome de usuário é obrigatorio',
  })
  @Column()
  username: string;

  @Exclude()
  @IsNotEmpty({
    message: 'Senha é obrigatorio',
  })
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Permissoes,
    default: Permissoes.Colaborador,
  })
  permissoes: string;

  @OneToOne(() => Colaborador, (colaborador) => colaborador.usuario)
  colaborador: Colaborador;

  @OneToOne(() => Profissional, (profissional) => profissional.usuario)
  profissional: Profissional;
}
