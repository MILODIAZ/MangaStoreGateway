import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Product } from '../models/product.model';
import { Category } from 'src/catalog/category/models/category.model';
import {
  createProductInput,
  updateProductInput,
  filterProductArgs,
} from '../dto/product.dto';
import { ProductsService } from '../service/product.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Product])
  async products(@Args() filters: filterProductArgs) {
    return this.productsService.findAll(filters);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => Product)
  async product(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @ResolveField()
  async categories(@Parent() product: Product) {
    const { id } = product;
    return this.productsService.getCategories(id);
  }

  @ResolveField()
  async stockItems(@Parent() product: Product) {
    const { id } = product;
    return this.productsService.getStockItems(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Product)
  async createProduct(@Args('data') data: createProductInput) {
    return this.productsService.create(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Product)
  async updateProduct(
    @Args('data') data: updateProductInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.productsService.update(id, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Product)
  async deleteProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.delete(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Category)
  async addCategoryToProduct(
    @Args('categoryId', { type: () => Int }) categoryId: number,
    @Args('productId', { type: () => Int }) productId: number,
  ) {
    return this.productsService.addCategory(categoryId, productId);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Category)
  async removeCategoryFromProduct(
    @Args('categoryId', { type: () => Int }) categoryId: number,
    @Args('productId', { type: () => Int }) productId: number,
  ) {
    return this.productsService.removeCategory(categoryId, productId);
  }
}
