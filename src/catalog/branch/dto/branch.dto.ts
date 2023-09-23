import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength, NotEquals } from 'class-validator';

@InputType()
export class branchInput {
  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
