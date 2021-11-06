import { Schema as MongooseSchema } from 'mongoose';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTeamInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class ListTeamInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class UpdateTeamInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  clicks?: number;
}
