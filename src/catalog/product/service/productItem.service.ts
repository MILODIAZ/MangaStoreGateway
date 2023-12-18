import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { ProductItem } from '../models/productItem.model';
import { Product } from '../models/product.model';
import { User } from 'src/auth/user/models/user.model';
import { Order } from 'src/catalog/order/models/order.model';
import {
  createProductItemInput,
  updateProductItemInput,
} from '../dto/productItem.dto';

@Injectable()
export class ProductItemsService {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyCart: ClientProxy = this.clientProxy.clientProxyCart();

  async create(payload: createProductItemInput) {
    const requestData = {
      username: payload.userName,
      productName: payload.productName,
      quantity: payload.quantity,
    };
    const response = await this.clientProxyCart
      .send('CREATE_CARTITEM', requestData)
      .toPromise();

    const data = Buffer.from(response.data, 'base64').toString('utf-8');
    console.log(data);

    return data;
  }

  async updateQuantity(id: number, payload: updateProductItemInput) {
    const requestData = {
      cartItemID: id,
      quantity: payload.quantity,
    };
    const response = await this.clientProxyCart
      .send('EDIT_CARTITEM', requestData)
      .toPromise();

    const data = Buffer.from(response.data, 'base64').toString('utf-8');
    console.log(data);

    return data;
  }

  async updateOrder(id: number, payload: updateProductItemInput) {
    const requestData = {
      cartItemID: id,
      OrderID: payload.orderId,
    };
    const response = await this.clientProxyCart
      .send('EDIT_CARTITEMORDER', requestData)
      .toPromise();

    const data = Buffer.from(response.data, 'base64').toString('utf-8');
    console.log(data);

    return data;
  }

  async delete(id: number, userName: string) {
    console.log(userName);
    console.log(id);
    const requestData = {
      username: userName,
      cartItemID: id,
    };
    const response = await this.clientProxyCart
      .send('DELETE_CARTITEM', requestData)
      .toPromise();

    const data = Buffer.from(response.data, 'base64').toString('utf-8');
    console.log(data);

    return data;
  }
}
