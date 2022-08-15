import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exames } from '../models/exames.model';
import { Repository } from 'typeorm';

@Injectable()
export class ExamesService {
  constructor(
    @InjectRepository(Exames)
    private examesModel: Repository<Exames>,
  ) {}

  async getAll(): Promise<Exames[]> {
    return this.examesModel.find();
  }

  async getOne(id: number): Promise<Exames> {
    return this.examesModel.findOne({
      where: { id: id },
      relations: ['colaborador', 'paciente', 'profissional', 'convenio'],
    });
  }

  async create(exames: Exames) {
    this.examesModel.save(exames);
  }

  async alter(exames: Exames): Promise<any> {
    return this.examesModel.save(exames);
  }

  async delete(id: number) {
    const exames: Exames = await this.examesModel.findOne({
      where: { id: id },
    });
    this.examesModel.remove(exames);
  }
}
