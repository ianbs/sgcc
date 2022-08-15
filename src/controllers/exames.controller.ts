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
import { Exames } from 'src/models/exames.model';
import { ConvenioService } from 'src/services/convenio.service';
import { ExamesService } from 'src/services/exames.service';

@Controller('exames')
export default class ExamesController {
  constructor(
    private examesService: ExamesService,
    private convenioService: ConvenioService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Exames[]> {
    return this.examesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param() params): Promise<Exames> {
    return this.examesService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() exames: Exames) {
    return this.examesService.create(exames);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async alter(@Body() exames: Exames): Promise<[number, Exames[]]> {
    return this.examesService.alter(exames);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params) {
    this.examesService.delete(params.id);
  }
}
