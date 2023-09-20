import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { BranchesResolver } from './branches.resolver';
import { BranchesService } from './branches.service';
import { StockItemsService } from './stock-item.service';
import { ProductsService } from 'src/product/products.service';
import { StockItemResolver } from './stock-item.resolver';

@Module({
  imports: [ProxyModule],
  providers: [
    ClientProxyMangaStore,
    BranchesResolver,
    BranchesService,
    StockItemResolver,
    StockItemsService,
    ProductsService,
  ],
  controllers: [BranchController],
})
export class BranchModule {}
