import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
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

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) AuthCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(AuthCredentialDto);
  }

  @Post('/test')
  test(@Req() req) {
    console.log('req', req);
  }
}
