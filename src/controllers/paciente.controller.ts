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
import { Paciente } from '../models/paciente.model';
import { PacienteService } from '../services/paciente.service';

@Controller('Paciente')
export default class PacienteController {
  constructor(private pacienteService: PacienteService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Paciente[]> {
    return this.pacienteService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param() params): Promise<Paciente> {
    return this.pacienteService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() paciente: Paciente) {
    this.pacienteService.create(paciente);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async alter(@Body() paciente: Paciente): Promise<[number, Paciente[]]> {
    return this.pacienteService.alter(paciente);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params) {
    this.pacienteService.delete(params.id);
  }
}
