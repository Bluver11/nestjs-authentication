import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { TokenStrategy } from './token.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,UsersService,PrismaService,TokenStrategy],
})
export class AuthModule {}
