import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { ProductMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { Product } from './models/product.model';
import { FilterProductsDto } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyProduct: ClientProxy =
    this.clientProxy.clientProxyProducts();

  async findAll(filter?: FilterProductsDto): Promise<Product[]> {
    const filterToSend = filter !== undefined ? filter : '';
    const response = await this.clientProxyProduct
      .send(ProductMSG.FIND_ALL, filterToSend)
      .toPromise();
    const { data } = response;
    return data;
  }
}
