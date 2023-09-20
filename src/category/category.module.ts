import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { ProductsService } from 'src/product/products.service';

@Module({
  imports: [ProxyModule],
  providers: [
    CategoriesResolver,
    CategoriesService,
    ClientProxyMangaStore,
    ProductsService,
  ],
  controllers: [CategoryController],
  exports: [CategoriesService],
})
export class CategoryModule {}
