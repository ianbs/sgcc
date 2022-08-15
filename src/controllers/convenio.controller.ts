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
import { Convenio } from 'src/models/convenio.model';
import { ConvenioService } from 'src/services/convenio.service';

@Controller('convenio')
export default class ConvenioController {
  constructor(private convenioService: ConvenioService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Convenio[]> {
    return this.convenioService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param() params): Promise<Convenio> {
    return this.convenioService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() convenio: Convenio) {
    this.convenioService.create(convenio);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async alter(@Body() convenio: Convenio): Promise<[number, Convenio[]]> {
    return this.convenioService.alter(convenio);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params) {
    this.convenioService.delete(params.id);
  }
}
