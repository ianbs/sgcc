import { SetMetadata } from '@nestjs/common';
import { Permissoes } from 'src/models/enums/permissoes.enum';

export const PERMISSOES_KEY = 'permissoes';
export const Permissao = (...permissao: Permissoes[]) =>
  SetMetadata(PERMISSOES_KEY, permissao);
