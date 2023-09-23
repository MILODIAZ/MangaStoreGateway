import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Category } from '../models/category.model';
import { CategoriesService } from '../service/categories.service';
import { filterProductArgs } from 'src/catalog/product/dto/product.dto';
import { categoryInput } from '../dto/category.dto';
import { Product } from 'src/catalog/product/models/product.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Category])
  async categories() {
    return this.categoriesService.findAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => Category)
  async category(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOne(id);
  }

  @ResolveField()
  async products(
    @Parent() category: Category,
    @Args() filters: filterProductArgs,
  ) {
    const { id } = category;
    return this.categoriesService.getProducts(id, filters);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Category)
  async createCategory(@Args('data') data: categoryInput) {
    return this.categoriesService.create(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Category)
  async updateCategory(
    @Args('data') data: categoryInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.categoriesService.update(id, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Category)
  async deleteCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.delete(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Product)
  async addProductToCategory(
    @Args('categoryId', { type: () => Int }) categoryId: number,
    @Args('productId', { type: () => Int }) productId: number,
  ) {
    return this.categoriesService.addProduct(categoryId, productId);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Product)
  async removeProductFromCategory(
    @Args('categoryId', { type: () => Int }) categoryId: number,
    @Args('productId', { type: () => Int }) productId: number,
  ) {
    return this.categoriesService.removeProduct(categoryId, productId);
  }
}
