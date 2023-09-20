import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from './models/product.model';
import { ProductsService } from './products.service';
import { CategoriesService } from 'src/category/categories.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Product)
export class ProductsResolver {
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Product])
  async products() {
    return this.productsService.findAll();
  }

  @ResolveField()
  async categories(@Parent() product: Product) {
    const { id } = product;
    return this.categoriesService.findAll({ productId: id });
  }
}
