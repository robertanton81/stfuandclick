import { Schema as MongooseSchema } from 'mongoose';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTeamInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class ListTeamInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class UpdateTeamInput {
  @Field(() => String)
  @IsNotEmpty()
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  clicks?: number;
}
