import { InputType, Field, ArgsType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  NotEquals,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsPositive,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';

@InputType()
export class createProductInput {
  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  readonly name: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(200)
  readonly description?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  @IsNumber()
  @NotEquals(null)
  @IsPositive()
  readonly price: number;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  readonly image?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  readonly isBlocked?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  readonly isFavourite?: boolean;
}

@InputType()
export class updateProductInput {
  @Field({ nullable: true })
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(200)
  readonly name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(200)
  readonly description?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @NotEquals(null)
  @IsPositive()
  @IsOptional()
  readonly price?: number;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  readonly image?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  readonly isBlocked?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  readonly isFavourite?: boolean;
}

@ArgsType()
export class filterProductArgs {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  limit?: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  offset?: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  minPrice?: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int, { nullable: true })
  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  search?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  categoryId?: number;
}
