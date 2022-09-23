import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'

import { FriendDto } from 'src/dtos/friend.dto'
import { Friend } from '../entities/friend.entity'

@Injectable()
export class FriendService {
  public constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>
  ) {

  }

  getFriendList(): Promise<Friend[]> {
    return this.friendsRepository.find()
  }

  addFriend(friend: FriendDto): Promise<Friend> {
    return this.friendsRepository.save(friend)
  }

  getFriend(id): Promise<Friend> {
    return this.friendsRepository.findOneBy({ id })
  }

  updateFriend(id: number, data: FriendDto): Promise<Friend> {
    const functhis = this;
    return this.friendsRepository.update(id, data)
      .then(() => {
        return functhis.friendsRepository.findOneBy({ id })
      })
  }

  deleteFriend(id: number): Promise<Friend> {
    const friend = this.friendsRepository.findOneBy({ id })
    return this.friendsRepository.delete(id)
      .then(() => {
        return friend
      })
  }
}
