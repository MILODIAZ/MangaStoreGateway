import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { ProductMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { Product } from '../models/product.model';
import { Category } from 'src/catalog/category/models/category.model';
import {
  createProductInput,
  updateProductInput,
  filterProductArgs,
} from '../dto/product.dto';
import { StockItem } from 'src/catalog/branch/models/stock-item.model';

@Injectable()
export class ProductsService {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyCatalog: ClientProxy =
    this.clientProxy.clientProxyCatalog();

  async findAll(filter?: filterProductArgs): Promise<Product[]> {
    const response = await this.clientProxyCatalog
      .send(ProductMSG.FIND_ALL, filter)
      .toPromise();
    const { data } = response;
    return data;
  }

  async findOne(id: number): Promise<Product> {
    const response = await this.clientProxyCatalog
      .send(ProductMSG.FIND_ONE, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async getCategories(id: number): Promise<Category[]> {
    const response = await this.clientProxyCatalog
      .send(ProductMSG.GET_CATEGORIES, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async getStockItems(id: number): Promise<StockItem[]> {
    const response = await this.clientProxyCatalog
      .send(ProductMSG.GET_STOCK_ITEMS, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async create(payload: createProductInput): Promise<Product> {
    const response = await this.clientProxyCatalog
      .send(ProductMSG.CREATE, payload)
      .toPromise();
    const { data } = response;
    return data;
  }

  async update(id: number, payload: updateProductInput): Promise<Product> {
    const response = await this.clientProxyCatalog
      .send(ProductMSG.UPDATE, { id, payload })
      .toPromise();
    const { data } = response;
    return data;
  }

  async delete(id: number): Promise<Product> {
    const response = await this.clientProxyCatalog
      .send(ProductMSG.DELETE, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async addCategory(categoryId: number, productId: number): Promise<Category> {
    const response = await this.clientProxyCatalog
      .send(ProductMSG.ADD_CATEGORY, { categoryId, productId })
      .toPromise();
    const { data } = response;
    return data;
  }

  async removeCategory(
    categoryId: number,
    productId: number,
  ): Promise<Category> {
    const response = await this.clientProxyCatalog
      .send(ProductMSG.REMOVE_CATEGORY, { categoryId, productId })
      .toPromise();
    const { data } = response;
    return data;
  }
}
