import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from '../models/paciente.model';
import { Endereco } from '../models/endereco.model';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteModel: Repository<Paciente>,
    @InjectRepository(Endereco)
    private enderecoModel: Repository<Endereco>,
  ) {}

  async getAll(): Promise<Paciente[]> {
    return this.pacienteModel.find({
      relations: ['enderecos'],
    });
  }

  async getOne(id: number): Promise<Paciente> {
    return this.pacienteModel.findOne({
      where: { id: id },
      relations: ['enderecos'],
    });
  }

  async create(paciente: Paciente) {
    paciente.enderecos.forEach((item) => {
      this.enderecoModel.create(item);
    });

    this.pacienteModel.save(paciente);
  }

  async alter(paciente: Paciente): Promise<any> {
    paciente.enderecos.forEach((item) => {
      this.enderecoModel.save(item);
    });
    return this.pacienteModel.save(paciente);
  }

  async delete(id: number) {
    const paciente: Paciente = await this.pacienteModel.findOne({
      where: { id: id },
      relations: ['enderecos'],
    });
    paciente.enderecos.forEach((item) => {
      this.enderecoModel.remove(item);
    });
    this.pacienteModel.remove(paciente);
  }
}
