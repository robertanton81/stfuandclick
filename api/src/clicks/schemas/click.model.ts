import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Click {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  session: string;

  @Field(() => Int, { nullable: false })
  @Prop({ required: true })
  clicks: number;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  teamId: string;
}

export type ClickDocument = Click & Document;

export const ClickSchema = SchemaFactory.createForClass(Click);
