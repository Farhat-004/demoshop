import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/dtos/registerUser.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './loginUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService){
    this.userService = userService;
  }
  async registerUser(registerUserDto: RegisterDto) {
    const result = await this.userService.createUser(registerUserDto);
    return result;
  }
  async loginUser(loginUserDto: LoginDto){
   
    const result = await this.userService.loginUser(loginUserDto);
    return result;
  }
}
