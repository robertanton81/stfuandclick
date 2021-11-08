import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
@Schema()
export class Team {
  @Field(() => ID, { nullable: true })
  // @Prop({ required: false })
  _id?: string;

  @Field(() => String, { nullable: false })
  @Prop()
  @ApiProperty()
  name: string;

  @Field(() => Int, { nullable: true })
  @Prop({ required: false })
  @ApiProperty({ required: false })
  clicks?: number;
}

export type TeamDocument = Team & Document;

export const TeamSchema = SchemaFactory.createForClass(Team);
