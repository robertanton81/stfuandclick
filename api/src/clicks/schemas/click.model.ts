import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
@Schema()
export class Click {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  @ApiProperty()
  session: string;

  @Field(() => Int, { nullable: false })
  @Prop({ required: true })
  @ApiProperty()
  clicks: number;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  @ApiProperty()
  teamId: string;
}

export type ClickDocument = Click & Document;

export const ClickSchema = SchemaFactory.createForClass(Click);
