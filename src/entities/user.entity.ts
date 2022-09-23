import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  @Field()
  name: string;

  @Column({ enum: ['user', 'admin'], type: 'enum' })
  @Field()
  role: string;

  @Column()
  @Field()
  password: string;
}
