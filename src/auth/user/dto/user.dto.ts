import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  NotEquals,
  IsOptional,
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
  @Field({ nullable: true })
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(200)
  readonly name?: string;

  @Field({ nullable: true })
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  @IsOptional()
  readonly lastName?: string;

  @Field({ nullable: true })
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  @IsOptional()
  readonly userName?: string;

  @Field({ nullable: true })
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
