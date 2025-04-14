import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  signin(
    @Body() payload: SignInDto,
  ) {
    return this.authService.signin(payload);
  }

  @Post('signup')
  signup(
    @Body() payload: SignUpDto,
  ) {
    return this.authService.signup(payload);
  }
}
