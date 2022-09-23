import { ObjectType } from '@nestjs/graphql';
import { Field, InputType } from 'type-graphql';

@InputType()
@ObjectType()
class FriendInput {
  @Field()
  readonly name: string;

  @Field()
  readonly age: string;

  @Field()
  readonly address: string;
}

export default FriendInput;
