import { Module } from '@nestjs/common';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { BranchesResolver } from './branch/resolver/branches.resolver';
import { StockItemResolver } from './branch/resolver/stock-item.resolver';
import { BranchesService } from './branch/service/branches.service';
import { StockItemsService } from './branch/service/stock-item.service';
import { CategoriesResolver } from './category/resolver/categories.resolver';
import { CategoriesService } from './category/service/categories.service';
import { ProductsResolver } from './product/resolver/product.resolver';
import { ProductsService } from './product/service/product.service';

@Module({
  imports: [ProxyModule],
  providers: [
    ClientProxyMangaStore,
    BranchesResolver,
    BranchesService,
    StockItemResolver,
    StockItemsService,
    CategoriesResolver,
    CategoriesService,
    ProductsResolver,
    ProductsService,
  ],
})
export class CatalogModule {}
