import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/catalog/product/models/product.model';

@ObjectType()
export class Category {
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
  @Field((type) => [Product], { nullable: 'items' })
  products: Product[];
}
