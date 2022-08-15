import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../models/usuario.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioModel: Repository<Usuario>,
  ) {}

  async getOne(username: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({
      where: { username: username },
      // relations: ['colaborador', 'profissional'],
    });
  }
}
