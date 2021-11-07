import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Team {
  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  id?: string;

  @Field(() => String, { nullable: false })
  @Prop()
  name: string;

  @Field(() => Int, { nullable: true })
  @Prop({ required: false })
  clicks?: number;
}

export type TeamDocument = Team & Document;

export const TeamSchema = SchemaFactory.createForClass(Team);
