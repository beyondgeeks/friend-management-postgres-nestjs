import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Friend {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  age: number;

  @Column()
  @Field()
  address: string;

  // @ManyToOne(() => User, { cascade: true })
  // @JoinColumn()
  // @Field(type => User)
  // user: User;
  @Column()
  @Field()
  userId: number;
}
