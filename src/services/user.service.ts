import { Injectable, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CredentialDto, UserDto } from 'src/dtos/user.dto';
import { User } from '../entities/user.entity';
import { jwtConstants } from 'src/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {
  }

  login(data: CredentialDto) {
    const functhis = this;
    return this.userRepository.findOneBy({ username: data.username })
      .then(async (user) => {
        const ismatch = await compare(data.password, user.password);
        if (ismatch) {
          delete user.password;
          const payload = { username: user.username, name: user.name, role: user.role, id: user.id };
          return {
            user,
            token: functhis.jwtService.sign(payload, { privateKey: jwtConstants.secret })
          };
        } else {
          return null;
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  async register(data: UserDto) {
    const salt = await genSalt();
    data.password = await hash(data.password, salt);
    return this.userRepository.save(data)
      .then((user) => {
        return user;
      })
      .catch((err) => {
      });
  }

  getUser(id): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
