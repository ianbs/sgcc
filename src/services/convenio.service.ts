import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Convenio } from 'src/models/Convenio.model';
import { Repository } from 'typeorm';

@Injectable()
export class ConvenioService {
  constructor(
    @InjectRepository(Convenio)
    private convenioModel: Repository<Convenio>,
  ) {}

  async getAll(): Promise<Convenio[]> {
    return this.convenioModel.find();
  }

  async getOne(id: number): Promise<Convenio> {
    return this.convenioModel.findOne({
      where: { id: id },
    });
  }

  async isActive(convenio: Convenio): Promise<boolean> {
    const conv = await this.convenioModel.findOne({
      select: ['ativo'],
      where: { id: convenio.id },
    });
    return conv.ativo;
  }

  async create(convenio: Convenio) {
    this.convenioModel.save(convenio);
  }

  async alter(convenio: Convenio): Promise<any> {
    return this.convenioModel.save(convenio);
  }

  async delete(id: number) {
    const convenio: Convenio = await this.convenioModel.findOne({
      where: { id: id },
    });
    this.convenioModel.remove(convenio);
  }
}
