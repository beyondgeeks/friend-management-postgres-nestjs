import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import UserResolver from 'src/resolvers/user.resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),],
  exports: [TypeOrmModule, UserService],
  controllers: [],
  providers: [UserService, JwtService, UserResolver],
})
export class UserModule { }
