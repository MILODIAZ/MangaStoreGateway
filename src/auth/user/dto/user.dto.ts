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
export class userDto {
  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  readonly name: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  readonly lastName: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  readonly userName: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  readonly email: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  readonly password: string;
}

@InputType()
export class updateUserDto {
  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(200)
  readonly name?: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  @IsOptional()
  readonly lastName?: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  @IsOptional()
  readonly userName?: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  @IsOptional()
  readonly email?: string;
}

@InputType()
export class loginDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly userName: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
