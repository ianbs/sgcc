import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Consulta } from 'src/models/consulta.model';
import { ConsultaService } from 'src/services/consulta.service';
import { ConvenioService } from 'src/services/convenio.service';

@Controller('Consulta')
export default class ConsultaController {
  constructor(
    private consultaService: ConsultaService,
    private convenioService: ConvenioService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Consulta[]> {
    return this.consultaService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param() params): Promise<Consulta> {
    return this.consultaService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() consulta: Consulta) {
    return this.consultaService.create(consulta);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async alter(@Body() consulta: Consulta): Promise<[number, Consulta[]]> {
    return this.consultaService.alter(consulta);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params) {
    this.consultaService.delete(params.id);
  }
}
