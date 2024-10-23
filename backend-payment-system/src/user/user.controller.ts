import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express';
import { GetUser } from 'src/auth/decorator';
import { MyJWTGuard } from 'src/auth/guard';
@Controller('user')
export class UserController {
    @Get('me')
    @UseGuards(MyJWTGuard)
    me(@GetUser() user:Request){
        return user;
    }
}
