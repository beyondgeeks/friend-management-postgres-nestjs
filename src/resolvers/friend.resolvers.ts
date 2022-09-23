import { Query, Resolver, Args, Mutation, Int, ResolveField, Parent } from "@nestjs/graphql";
import { FriendDto } from "src/dtos/friend.dto";
import { Friend } from "src/entities/friend.entity";
import { User } from "src/entities/user.entity";
import { FriendService } from "src/services/friend.service";
import { UserService } from "src/services/user.service";

@Resolver(() => Friend)
class FriendResolver {
  constructor(
    private friendservice: FriendService,
    private userService: UserService,
  ) { }
  // constructor(private readonly friendService: FriendService) { }

  @Query(() => [Friend])
  public async getFriends() {
    return this.friendservice.getFriendList();
  }

  @Query(() => Friend)
  public async getFriend(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.friendservice.getFriend(id);
  }

  @Mutation(() => Friend)
  public async addFriend(@Args('data') data: FriendDto): Promise<Friend> {
    return this.friendservice.addFriend(data);
  }

  @Mutation(() => Friend)
  public async updateFriend(@Args({ name: 'id', type: () => Int }) id: number, @Args('data') data: FriendDto): Promise<Friend> {
    return this.friendservice.updateFriend(id, data);
  }

  @Mutation(() => Friend)
  public async deleteFriend(@Args({ name: 'id', type: () => Int }) id: number): Promise<Friend> {
    return this.friendservice.deleteFriend(id);
  }

  @ResolveField('user', returns => User)
  async user(@Parent() friend: Friend) {
    const { userId } = friend;
    return this.userService.getUser(userId);
  }
}

export default FriendResolver;
