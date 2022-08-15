import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUsuario(usernameUser: string, passwordUser: string) {
    const usuario = await this.usuarioService.getOne(usernameUser);
    if (usuario && usuario.password === passwordUser) {
      const { id, username, permissoes, colaborador, profissional } = usuario;
      return { id, username, permissoes, colaborador, profissional };
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      permissoes: user.permissoes,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
