import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      username: 'username',
      password: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const usuario = await this.authService.validateUsuario(username, password);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
