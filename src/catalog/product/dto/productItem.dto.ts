import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  NotEquals,
  IsOptional,
  IsNumber,
  IsPositive,
} from 'class-validator';

@InputType()
export class createProductItemInput {
  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  readonly userName: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  readonly productName: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  @IsNumber()
  @NotEquals(null)
  @IsPositive()
  readonly quantity: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @NotEquals(null)
  @IsPositive()
  @IsOptional()
  readonly orderId?: number;
}

@InputType()
export class updateProductItemInput {
  @Field({ nullable: true })
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  readonly userName?: string;

  @Field({ nullable: true })
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  readonly productName?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @NotEquals(null)
  @IsPositive()
  @IsOptional()
  readonly quantity?: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @NotEquals(null)
  @IsPositive()
  @IsOptional()
  readonly orderId?: number;
}
