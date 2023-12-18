import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/user/models/user.model';
import { Product } from './product.model';
import { Order } from 'src/catalog/order/models/order.model';

@ObjectType()
export class ProductItem {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Product, { nullable: false })
  products: Product;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int, { nullable: false })
  quantity: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => User, { nullable: false })
  user: User;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Order, { nullable: true })
  order: Order;
}
