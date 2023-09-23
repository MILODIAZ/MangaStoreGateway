import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { StockItem } from '../models/stock-item.model';
import { StockItemsService } from '../service/stock-item.service';
import { updateStockItemInput } from '../dto/stock-item.dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => StockItem)
export class StockItemResolver {
  constructor(private stockItemsService: StockItemsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [StockItem])
  async stockItems() {
    return this.stockItemsService.findAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => StockItem)
  async stockItem(@Args('id', { type: () => Int }) id: number) {
    return this.stockItemsService.findOne(id);
  }

  @ResolveField()
  async branch(@Parent() stockItem: StockItem) {
    const { id } = stockItem;
    return this.stockItemsService.getBranch(id);
  }

  @ResolveField()
  async product(@Parent() stockItem: StockItem) {
    const { id } = stockItem;
    return this.stockItemsService.getProduct(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => StockItem)
  async createStockItem(
    @Args('productId', { type: () => Int }) productId: number,
    @Args('branchId', { type: () => Int }) branchId: number,
  ) {
    return this.stockItemsService.create(productId, branchId);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => StockItem)
  async updateStockItem(
    @Args('data') data: updateStockItemInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.stockItemsService.update(id, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => StockItem)
  async deleteStockItem(@Args('id', { type: () => Int }) id: number) {
    return this.stockItemsService.delete(id);
  }
}
