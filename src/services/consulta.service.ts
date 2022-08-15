import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consulta } from '../models/consulta.model';
import { Repository } from 'typeorm';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Consulta)
    private consultaModel: Repository<Consulta>,
  ) {}

  async getAll(): Promise<Consulta[]> {
    return this.consultaModel.find();
  }

  async getOne(id: number): Promise<Consulta> {
    return this.consultaModel.findOne({
      where: { id: id },
      relations: ['colaborador', 'paciente', 'profissional', 'convenio'],
    });
  }

  async create(Consulta: Consulta) {
    this.consultaModel.save(Consulta);
  }

  async alter(Consulta: Consulta): Promise<any> {
    return this.consultaModel.save(Consulta);
  }

  async delete(id: number) {
    const consulta: Consulta = await this.consultaModel.findOne({
      where: { id: id },
    });
    this.consultaModel.remove(consulta);
  }
}
