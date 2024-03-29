import { Body, Controller,Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { verify } from 'argon2';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService
    ) {}


  @Post('login')
  async login(@Body() LoginDto: LoginDto){

    const user = await this.usersService.findByEmail(LoginDto.email);
    if(user == null){
      throw new UnauthorizedException('Hibás email vagy jelszó!')
    }
    if(!await verify(user.password, LoginDto.password)){
      throw new UnauthorizedException('Hibás email vagy jelszó!')
    }
    return {
      token: await this.authService.generateTokenFor(user),
    }


  }
}
