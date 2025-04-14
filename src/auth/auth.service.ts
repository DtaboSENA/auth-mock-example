import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { HandledErrorsEnum } from 'src/common/enum/handled-errors.enum';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
  ) { }

  async signup(payload: SignUpDto) {
    const { email } = payload;
    const userFound = await this.userService.findOneByEmail(email);
    if (userFound) throw new ConflictException(HandledErrorsEnum.USER_ALREADY_EXIST);

    await this.userService.create(payload);
  }

  async signin({ email, password }: SignInDto) {
    const userFound = await this.userService.findOneByEmail(email);
    if (!userFound) throw new ConflictException(HandledErrorsEnum.INVALID_CREDENTIALS);

    const isPassValid: boolean = await bcryptjs.compare(password, userFound.password);
    if (!isPassValid) throw new UnauthorizedException(HandledErrorsEnum.INVALID_CREDENTIALS);

    return 'login succesfully';
  }
}
