import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { CategoryMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { Category } from './models/category.model';
import { FilterCategoriesDto } from './category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyCategory: ClientProxy =
    this.clientProxy.clientProxyCategories();

  async findAll(filter?: FilterCategoriesDto): Promise<Category[]> {
    const filterToSend = filter !== undefined ? filter : '';
    const response = await this.clientProxyCategory
      .send(CategoryMSG.FIND_ALL, filterToSend)
      .toPromise();
    const { data } = response;

    return data;
  }
}
