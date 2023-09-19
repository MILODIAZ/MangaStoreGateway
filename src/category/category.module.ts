import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';

@Module({
  imports: [ProxyModule],
  providers: [CategoriesResolver, CategoriesService, ClientProxyMangaStore],
  controllers: [CategoryController],
})
export class CategoryModule { }
