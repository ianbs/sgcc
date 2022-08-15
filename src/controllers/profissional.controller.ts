import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Profissional } from 'src/models/profissional.model';
import { ProfissionalService } from 'src/services/profissional.service';

@Controller('Profissional')
export default class ProfissionalController {
  constructor(private profissionalService: ProfissionalService) {}

  private readonly logger = new Logger(ProfissionalController.name);

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Profissional[]> {
    this.logger.log('Getting All Profissionais');
    return this.profissionalService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param() params): Promise<Profissional> {
    return this.profissionalService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() profissional: Profissional) {
    this.profissionalService.create(profissional);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async alter(
    @Body() profissional: Profissional,
  ): Promise<[number, Profissional[]]> {
    return this.profissionalService.alter(profissional);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params) {
    this.profissionalService.delete(params.id);
  }
}
