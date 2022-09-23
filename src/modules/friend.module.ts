import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendService } from '../services/friend.service';
import { Friend } from '../entities/friend.entity';
import FriendResolver from 'src/resolvers/friend.resolvers';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friend]),
    UserModule,
  ],
  exports: [TypeOrmModule],
  providers: [FriendService, FriendResolver],
})
export class FriendModule { }
