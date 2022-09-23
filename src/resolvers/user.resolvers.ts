import { Query, Resolver, Args, Mutation, Int, ResolveField, Parent } from "@nestjs/graphql";
import { FriendDto } from "src/dtos/friend.dto";
import { User } from "src/entities/user.entity";
import { UserService } from "src/services/user.service";

@Resolver()
class UserResolver {
  constructor(
    private userService: UserService) { }
  // constructor(private readonly friendService: FriendService) { }

  @Query(() => User)
  public async getUser(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.userService.getUser(id);
  }
}

export default UserResolver;
