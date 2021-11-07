import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Team {
  @Field(() => ID, { nullable: true })
  // @Prop({ required: false })
  _id?: string;

  @Field(() => String, { nullable: false })
  @Prop()
  name: string;

  @Field(() => Int, { nullable: true })
  @Prop({ required: false })
  clicks?: number;

  @Field(() => Int, { nullable: true })
  order?: number;
}

export type TeamDocument = Team & Document;

export const TeamSchema = SchemaFactory.createForClass(Team);
