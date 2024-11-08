import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [UserController]
})
export class UserModule {}
