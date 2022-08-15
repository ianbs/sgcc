import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborador } from 'src/models/colaborador.model';
import { Endereco } from 'src/models/endereco.model';
import { Usuario } from 'src/models/usuario.model';
import { Repository } from 'typeorm';

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(Colaborador)
    private colaboradorModel: Repository<Colaborador>,
    @InjectRepository(Usuario)
    private usuarioModel: Repository<Usuario>,
    @InjectRepository(Endereco)
    private enderecoModel: Repository<Endereco>,
  ) {}

  async getAll(): Promise<Colaborador[]> {
    return this.colaboradorModel.find({
      relations: ['usuario', 'enderecos'],
    });
  }

  async getOne(id: number): Promise<Colaborador> {
    return this.colaboradorModel.findOne({
      where: { id: id },
      relations: ['usuario', 'enderecos'],
    });
  }

  async create(colaborador: Colaborador) {
    const usuario = await this.usuarioModel.save(colaborador.usuario);

    colaborador.enderecos.forEach((item) => {
      this.enderecoModel.create(item);
    });

    colaborador.usuario = usuario;

    this.colaboradorModel.save(colaborador);
  }

  async alter(colaborador: Colaborador): Promise<any> {
    this.usuarioModel.save(colaborador.usuario);
    colaborador.enderecos.forEach((item) => {
      this.enderecoModel.save(item);
    });
    return this.colaboradorModel.save(colaborador);
  }

  async delete(id: number) {
    const colaborador: Colaborador = await this.colaboradorModel.findOne({
      where: { id: id },
      relations: ['usuario', 'enderecos'],
    });
    colaborador.enderecos.forEach((item) => {
      this.enderecoModel.remove(item);
    });
    this.colaboradorModel.remove(colaborador);
    this.usuarioModel.remove(colaborador.usuario);
  }
}
