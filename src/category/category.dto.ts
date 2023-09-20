import {
  IsString,
  IsNotEmpty,
  MaxLength,
  NotEquals,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CategoryDto {
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;
}

export class FilterCategoriesDto {
  @IsOptional()
  @IsPositive()
  productId?: number;
}
