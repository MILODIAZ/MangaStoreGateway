import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/models/product.model';
import { Branch } from './branch.model';

@ObjectType()
export class StockItem {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Branch)
  branch: Branch;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Product)
  product: Product;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  stock: number;
}
