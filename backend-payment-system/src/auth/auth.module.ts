import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from './strategy';
import { WalletModule } from 'src/wallet/wallet.module';
import { WalletService } from 'src/wallet/wallet.service';
@Module({
    imports:[
        JwtModule.register({})
    ],
    controllers:[
        AuthController
    ],
    providers:[
        AuthService,
        JwtStrategy,
        WalletService
    ]
})
export class AuthModule {}
