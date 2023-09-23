import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { StockItemMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { StockItem } from '../models/stock-item.model';
import { Branch } from '../models/branch.model';
import { Product } from 'src/catalog/product/models/product.model';
import { updateStockItemInput } from '../dto/stock-item.dto';

@Injectable()
export class StockItemsService {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyCatalog: ClientProxy =
    this.clientProxy.clientProxyCatalog();

  async findAll(): Promise<StockItem[]> {
    const response = await this.clientProxyCatalog
      .send(StockItemMSG.FIND_ALL, '')
      .toPromise();
    const { data } = response;
    return data;
  }

  async findOne(id: number): Promise<StockItem> {
    const response = await this.clientProxyCatalog
      .send(StockItemMSG.FIND_ONE, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async getBranch(id: number): Promise<Branch> {
    const response = await this.clientProxyCatalog
      .send(StockItemMSG.GET_BRANCH, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async getProduct(id: number): Promise<Product> {
    const response = await this.clientProxyCatalog
      .send(StockItemMSG.GET_PRODUCT, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async create(productId: number, branchId: number): Promise<StockItem> {
    const response = await this.clientProxyCatalog
      .send(StockItemMSG.CREATE, { productId, branchId })
      .toPromise();
    const { data } = response;
    return data;
  }

  async update(id: number, payload: updateStockItemInput): Promise<StockItem> {
    const response = await this.clientProxyCatalog
      .send(StockItemMSG.UPDATE, { id, payload })
      .toPromise();
    const { data } = response;
    return data;
  }

  async delete(id: number): Promise<StockItem> {
    const response = await this.clientProxyCatalog
      .send(StockItemMSG.DELETE, id)
      .toPromise();
    const { data } = response;
    return data;
  }
}
