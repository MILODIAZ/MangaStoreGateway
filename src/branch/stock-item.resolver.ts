import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from 'src/product/models/product.model';
import { Branch } from './models/branch.model';
import { StockItem } from './models/stock-item.model';
import { BranchesService } from './branches.service';
import { ProductsService } from 'src/product/products.service';
import { StockItemsService } from './stock-item.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => StockItem)
export class StockItemResolver {
  constructor(
    private stockItemsService: StockItemsService,
    private productsService: ProductsService,
    private branchesService: BranchesService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [StockItem])
  async stockItems() {
    return this.stockItemsService.findAll();
  }

  @ResolveField()
  async branch(@Parent() stockItem: StockItem) {
    const { id } = stockItem;
    return this.branchesService.findOneByStockItem(id);
  }

  /*@ResolveField()
  async product(@Parent() stockItem: StockItem) {
    const { id } = stockItem;
    return this.productsService.findOneByStockItem(id);
  }*/
}
