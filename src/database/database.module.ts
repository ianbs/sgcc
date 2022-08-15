import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ColaboradorController from 'src/controllers/colaborador.controller';
import ConsultaController from 'src/controllers/consulta.controller';
import ConvenioController from 'src/controllers/convenio.controller';
import ExamesController from 'src/controllers/exames.controller';
import PacienteController from 'src/controllers/paciente.controller';
import ProfissionalController from 'src/controllers/profissional.controller';
import { Cidade } from 'src/models/cidade.model';
import { Colaborador } from 'src/models/colaborador.model';
import { Consulta } from 'src/models/consulta.model';
import { Convenio } from 'src/models/convenio.model';
import { Endereco } from 'src/models/endereco.model';
import { Estado } from 'src/models/estado.model';
import { Exames } from 'src/models/exames.model';
import { Paciente } from 'src/models/Paciente.model';
import { Profissional } from 'src/models/profissional.model';
import { Usuario } from 'src/models/usuario.model';
import { ColaboradorService } from 'src/services/colaborador.service';
import { ConsultaService } from 'src/services/consulta.service';
import { ConvenioService } from 'src/services/convenio.service';
import { ExamesService } from 'src/services/exames.service';
import { PacienteService } from 'src/services/paciente.service';
import { ProfissionalService } from 'src/services/profissional.service';
import { IsConvenioActiveConstraint } from 'src/validators/isConvenioActive.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `development.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_URL,
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
