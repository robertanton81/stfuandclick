import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTeamInput {
  @Field(() => String)
  @ApiProperty({ description: 'Name of created team', default: 'Avangers' })
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
  // @ApiProperty()
  id: string;

  @Field(() => String, { nullable: true })
  // @ApiProperty()
  name?: string;

  @Field(() => Int, { nullable: true })
  // @ApiProperty()
  clicks?: number;
}

@InputType()
export class GetTeamInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  // @ApiProperty()
  id: string;
}
