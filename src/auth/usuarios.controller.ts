import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class UsuariosController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
