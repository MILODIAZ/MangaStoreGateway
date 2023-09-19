import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
@Module({
  imports: [ProxyModule],
  providers: [ProductsResolver, ProductsService, ClientProxyMangaStore],
  controllers: [ProductController],
})
export class ProductModule { }
