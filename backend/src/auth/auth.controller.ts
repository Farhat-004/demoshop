import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dtos/registerUser.dto';
import bcrypt from "bcryptjs";
import { LoginDto } from './loginUser.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }
  @Post('register') //auth/register
  async register(@Body() registerUserDto: RegisterDto) {
    const hash = bcrypt.hashSync(registerUserDto.password, 10);
    const result = await this.authService.registerUser({
      fname:registerUserDto.fname,
      lname:registerUserDto.lname,
      email:registerUserDto.email,
      password:hash,
    });
    return result;
  }

  @Post('login') //auth/login
  async login(@Body() loginUserDto: LoginDto){
    const result = await this.authService.loginUser(loginUserDto);
    return result;
  }
}
