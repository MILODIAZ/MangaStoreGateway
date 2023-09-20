import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { CategoryModule } from 'src/category/category.module';
import { CategoriesService } from 'src/category/categories.service';
import { BranchModule } from 'src/branch/branch.module';
import { StockItemsService } from 'src/branch/stock-item.service';

@Module({
  imports: [ProxyModule, CategoryModule, BranchModule],
  providers: [
    ProductsResolver,
    ProductsService,
    ClientProxyMangaStore,
    CategoriesService,
    StockItemsService,
  ],
  controllers: [ProductController],
  exports: [ProductsService],
})
export class ProductModule {}
