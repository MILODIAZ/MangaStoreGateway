import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, NotEquals } from 'class-validator';

@InputType()
export class updateStockItemInput {
  @Field()
  @IsNumber()
  @NotEquals(null)
  @NotEquals(0)
  stock: number;
}
