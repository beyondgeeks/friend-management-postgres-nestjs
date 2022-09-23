import { FilterableField } from "@nestjs-query/query-graphql";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "src/entities/user.entity";

// @ObjectType()
@InputType()
export class FriendDto {
  @FilterableField({ nullable: true })
  name?: string;

  @FilterableField({ nullable: true })
  age?: number;

  @FilterableField({ nullable: true })
  address?: string;
}