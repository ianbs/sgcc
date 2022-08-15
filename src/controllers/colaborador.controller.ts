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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Colaborador } from '../models/colaborador.model';
import { ColaboradorService } from '../services/colaborador.service';

@Controller('colaborador')
export default class ColaboradorController {
  constructor(private colaboradorService: ColaboradorService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Colaborador[]> {
    return this.colaboradorService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param() params): Promise<Colaborador> {
    return this.colaboradorService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() colaborador: Colaborador) {
    this.colaboradorService.create(colaborador);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async alter(
    @Body() colaborador: Colaborador,
  ): Promise<[number, Colaborador[]]> {
    return this.colaboradorService.alter(colaborador);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params) {
    this.colaboradorService.delete(params.id);
  }
}
