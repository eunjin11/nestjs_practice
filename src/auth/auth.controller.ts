import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) AuthCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(AuthCredentialDto);
  }
}
