import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateClickInput {
  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  @ApiProperty()
  clicks: number;
}

@InputType()
export class CreateClickInput {
  @Field(() => String, { nullable: false })
  @ApiProperty({ description: 'show your team some love', default: 'roboaaa' })
  session: string;

  @Field(() => String, { nullable: false })
  @ApiProperty({
    description: 'id of the team to get the click',
    default: 'teamnumber1',
  })
  teamId: string;
}
