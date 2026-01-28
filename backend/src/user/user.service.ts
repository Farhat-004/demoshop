import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from 'src/dtos/registerUser.dto';
import { LoginDto } from 'src/auth/loginUser.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(private prisma:PrismaService,private jwtService: JwtService){}

    async createUser(registerUserDto: RegisterDto){

        try {
            const user=await this.prisma.user.create({
            data:{
            fname:registerUserDto.fname,
            lname:registerUserDto.lname,
            email:registerUserDto.email,
            password:registerUserDto.password,
        }}
        )
        return user;
        } catch (error) {
            const DUPLICATE_USER_CODE='P2002'
            error.code
            if(error.code==DUPLICATE_USER_CODE){
                throw new ConflictException("User already exists")
            }
            throw error;
        }
    }
    async loginUser(loginUserDto:LoginDto){

        const user = await this.prisma.user.findUnique({where:{
            email:loginUserDto.email,
            
        }});
        if(user && user.password){
            const isMatch= await bcrypt.compare(loginUserDto.password,user.password);

            if(isMatch){
                const payload = { id: user.id, username: user.fname, role:user.role };
                const accessToken= await this.jwtService.signAsync(payload);
                return {user:{
                    email:user?.email,fname:user.fname,lname:user.lname,role:user.role,id:user.id
                },accessToken};
            }else{
                return {"message":"invalid password"};
            }
        }
       return {"message":"invalid email. user not found"};
    }
}
