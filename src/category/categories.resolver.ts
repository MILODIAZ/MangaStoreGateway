import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Category } from './models/category.model';
import { CategoriesService } from './categories.service';
import { ProductsService } from 'src/product/products.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Category])
  async categories() {
    return this.categoriesService.findAll();
  }

  @ResolveField()
  async products(@Parent() category: Category) {
    const { id } = category;
    return this.productsService.findAll({ categoryId: id });
  }
}
