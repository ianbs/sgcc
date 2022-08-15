import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ColaboradorController from '../controllers/colaborador.controller';
import ConsultaController from '../controllers/consulta.controller';
import ConvenioController from '../controllers/convenio.controller';
import ExamesController from '../controllers/exames.controller';
import PacienteController from '../controllers/paciente.controller';
import ProfissionalController from '../controllers/profissional.controller';
import { Cidade } from '../models/cidade.model';
import { Colaborador } from '../models/colaborador.model';
import { Consulta } from '../models/consulta.model';
import { Convenio } from '../models/convenio.model';
import { Endereco } from '../models/endereco.model';
import { Estado } from '../models/estado.model';
import { Exames } from '../models/exames.model';
import { Paciente } from '../models/paciente.model';
import { Profissional } from '../models/profissional.model';
import { Usuario } from '../models/usuario.model';
import { ColaboradorService } from '../services/colaborador.service';
import { ConsultaService } from '../services/consulta.service';
import { ConvenioService } from '../services/convenio.service';
import { ExamesService } from '../services/exames.service';
import { PacienteService } from '../services/paciente.service';
import { ProfissionalService } from '../services/profissional.service';
import { IsConvenioActiveConstraint } from '../validators/isConvenioActive.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `development.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: process.env.DATABASE_URL,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: `${process.env.DB_PASS}`,
      database: process.env.DB_DB,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities: [],
    }),
    TypeOrmModule.forFeature([
      Colaborador,
      Usuario,
      Profissional,
      Endereco,
      Cidade,
      Estado,
      Paciente,
      Convenio,
      Consulta,
      Exames,
    ]),
  ],
  providers: [
    ColaboradorService,
    ProfissionalService,
    PacienteService,
    ConvenioService,
    ConsultaService,
    ExamesService,
    IsConvenioActiveConstraint,
  ],
  controllers: [
    ColaboradorController,
    ProfissionalController,
    PacienteController,
    ConvenioController,
    ConsultaController,
    ExamesController,
  ],
})
export class DatabaseModule {}
