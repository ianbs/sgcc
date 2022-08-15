import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from './usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
