import { Controller, Get, Req, UseGuards,Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express';
import { GetUser } from 'src/auth/decorator';
import { MyJWTGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
@Controller('user')
export class UserController {
    constructor(private prismaService:PrismaService){
        
    }
    @Get('me')
    // @UseGuards(MyJWTGuard)
    me(@GetUser() user:Request){
        return user;
    }
    @Get('get-all-users')
    async getAllUsers() {
        const users = await this.prismaService.user.findMany();
        return users;
    }
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const user = await this.prismaService.user.findUnique({
            where: { id: Number(id) },
        });
        return user;
    }

}
