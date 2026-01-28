import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
    constructor(private readonly prisma: PrismaService) {}

    getHello(): string {
        return 'welcome to demoShop backends api';
    }

    async getUsers() {
        const users = await this.prisma.user.findMany();
        return users;
    }
}
