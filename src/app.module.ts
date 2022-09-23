import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Friend } from './entities/friend.entity';
import { User } from './entities/user.entity';
import { FriendModule } from './modules/friend.module';
import { UserModule } from './modules/user.module';
import { jwtConstants } from 'src/constants';
import { JwtStrategy } from './jwt.strategy';
// import FriendResolver from './resolvers/friend.resolvers';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { FriendService } from './services/friend.service';

// const graphQLImports = [
//   FriendResolver,
// ]

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'friend_management_graphql',
      entities: [Friend, User],
      synchronize: true,
    }),
    FriendModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    })
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, JwtStrategy],
})
export class AppModule { }
