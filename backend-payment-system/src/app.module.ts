import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
  AuthModule,
  UserModule,
  NoteModule,  
  PrismaModule, 
  WalletModule,
  ],

})
export class AppModule {}
