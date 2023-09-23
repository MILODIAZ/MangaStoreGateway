import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { CategoryMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { Category } from '../models/category.model';
import { Product } from 'src/catalog/product/models/product.model';
import { filterProductArgs } from 'src/catalog/product/dto/product.dto';
import { categoryInput } from '../dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyCatalog: ClientProxy =
    this.clientProxy.clientProxyCatalog();

  async findAll(): Promise<Category[]> {
    const response = await this.clientProxyCatalog
      .send(CategoryMSG.FIND_ALL, '')
      .toPromise();
    const { data } = response;

    return data;
  }

  async findOne(id: number): Promise<Category> {
    const response = await this.clientProxyCatalog
      .send(CategoryMSG.FIND_ONE, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async getProducts(
    id: number,
    filter?: filterProductArgs,
  ): Promise<Product[]> {
    const payload = filter !== undefined ? filter : '';
    const response = await this.clientProxyCatalog
      .send(CategoryMSG.GET_PRODUCTS, { id, payload })
      .toPromise();
    const { data } = response;
    return data;
  }

  async create(payload: categoryInput): Promise<Category> {
    const response = await this.clientProxyCatalog
      .send(CategoryMSG.CREATE, payload)
      .toPromise();
    const { data } = response;
    return data;
  }

  async update(id: number, payload: categoryInput): Promise<Category> {
    const response = await this.clientProxyCatalog
      .send(CategoryMSG.UPDATE, { id, payload })
      .toPromise();
    const { data } = response;
    return data;
  }

  async delete(id: number): Promise<Category> {
    const response = await this.clientProxyCatalog
      .send(CategoryMSG.DELETE, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async addProduct(categoryId: number, productId: number): Promise<Product> {
    const response = await this.clientProxyCatalog
      .send(CategoryMSG.ADD_PRODUCT, { categoryId, productId })
      .toPromise();
    const { data } = response;
    return data;
  }

  async removeProduct(categoryId: number, productId: number): Promise<Product> {
    const response = await this.clientProxyCatalog
      .send(CategoryMSG.REMOVE_PRODUCT, { categoryId, productId })
      .toPromise();
    const { data } = response;
    return data;
  }
}
