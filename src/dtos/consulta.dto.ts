import { ColaboradorConsultaDTO } from './colaborador-consulta.dto';
import { PacienteConsultaDTO } from './paciente-consulta.dto';
import { ProfissionalConsultaDTO } from './profissional-consulta.dto';

export class ConsultaDTO {
  id: number;
  tipoConsulta: string;
  indicacaoAcidente: string;
  caracterAtendimento: string;
  atendimentoRecemNascido: boolean;
  dataRealizacao: Date;
  dataCancelamento: Date;
  cancelado: boolean;
  colaborador: ColaboradorConsultaDTO;
  paciente: PacienteConsultaDTO;
  profissional: ProfissionalConsultaDTO;
}
