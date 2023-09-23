import { Field, Int, ObjectType } from '@nestjs/graphql';
import { StockItem } from './stock-item.model';

@ObjectType()
export class Branch {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  createAt: string;

  @Field()
  updateAt: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [StockItem], { nullable: 'items' })
  stockItems: StockItem[];
}
