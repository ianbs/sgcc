import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profissional } from '../models/profissional.model';
import { Endereco } from '../models/endereco.model';
import { Usuario } from '../models/usuario.model';
import { Repository } from 'typeorm';

@Injectable()
export class ProfissionalService {
  constructor(
    @InjectRepository(Profissional)
    private profissionalModel: Repository<Profissional>,
    @InjectRepository(Usuario)
    private usuarioModel: Repository<Usuario>,
    @InjectRepository(Endereco)
    private enderecoModel: Repository<Endereco>,
  ) {}

  async getAll(): Promise<Profissional[]> {
    return this.profissionalModel.find({
      relations: ['usuario', 'enderecos'],
    });
  }

  async getOne(id: number): Promise<Profissional> {
    return this.profissionalModel.findOne({
      where: { id: id },
      relations: ['usuario', 'enderecos'],
    });
  }

  async create(profissional: Profissional) {
    const usuario = await this.usuarioModel.save(profissional.usuario);

    profissional.enderecos.forEach((item) => {
      this.enderecoModel.create(item);
    });

    profissional.usuario = usuario;

    this.profissionalModel.save(profissional);
  }

  async alter(profissional: Profissional): Promise<any> {
    this.usuarioModel.save(profissional.usuario);
    profissional.enderecos.forEach((item) => {
      this.enderecoModel.save(item);
    });
    return this.profissionalModel.save(profissional);
  }

  async delete(id: number) {
    const profissional: Profissional = await this.profissionalModel.findOne({
      where: { id: id },
      relations: ['usuario', 'enderecos'],
    });
    profissional.enderecos.forEach((item) => {
      this.enderecoModel.remove(item);
    });
    this.profissionalModel.remove(profissional);

    this.usuarioModel.remove(profissional.usuario);
  }
}
