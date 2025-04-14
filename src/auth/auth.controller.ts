import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  @HttpCode(200)
  signin(
    @Body() payload: SignInDto,
  ) {
    return this.authService.signin(payload);
  }

  @Post('signup')
  @HttpCode(201)
  signup(
    @Body() payload: SignUpDto,
  ) {
    return this.authService.signup(payload);
  }
}
