import {
  Args,
  Int,
  Mutation,
  /*Parent,
  Query,
  ResolveField,*/
  Resolver,
} from '@nestjs/graphql';

import { ProductItem } from '../models/productItem.model';
/*import { Product } from '../models/product.model';
import { User } from 'src/auth/user/models/user.model';
import { Order } from 'src/catalog/order/models/order.model';*/
import {
  createProductItemInput,
  updateProductItemInput,
} from '../dto/productItem.dto';
import { ProductItemsService } from '../service/productItem.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => ProductItem)
export class ProductItemResolver {
  constructor(private productItemsService: ProductItemsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  /*@Query((returns) => [ProductItem])
  async productItems() {
    return this.productItemsService.findAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => ProductItem)
  async productItem(@Args('id', { type: () => Int }) id: number) {
    return this.productItemsService.findOne(id);
  }*/

  /*@ResolveField()
  async user(@Parent() productItem: ProductItem) {
    const { id } = productItem;
    return this.productItemsService.getUser(id);
  }*/

  /*@ResolveField()
  async product(@Parent() productItem: ProductItem) {
    const { id } = productItem;
    return this.productItemsService.getProduct(id);
  }*/

  /*@ResolveField()
  async order(@Parent() productItem: ProductItem) {
    const { id } = productItem;
    return this.productItemsService.getOrder(id);
  }*/

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => String)
  async createProductItem(@Args('data') data: createProductItemInput) {
    return this.productItemsService.create(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Int)
  async updateProductItemQuantity(
    @Args('data') data: updateProductItemInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.productItemsService.updateQuantity(id, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => String)
  async updateProductItemOrder(
    @Args('data') data: updateProductItemInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.productItemsService.updateOrder(id, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => String)
  async deleteProductItem(
    @Args('id', { type: () => Int }) id: number,
    @Args('userName', { type: () => String }) userName: string,
  ) {
    return this.productItemsService.delete(id, userName);
  }
}
