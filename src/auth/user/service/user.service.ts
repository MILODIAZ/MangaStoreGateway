import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { PaymentMSG, UserMSG } from 'src/common/constants';
import { ProductMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { User } from '../models/user.model';
import { userDto, updateUserDto, loginDto } from '../dto/user.dto';
import { productQty } from '../resolver/user.resolver';

@Injectable()
export class UsersService {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyAuthorization: ClientProxy =
    this.clientProxy.clientProxyAuthorization();
  private clientProxyCart: ClientProxy = this.clientProxy.clientProxyCart();
  private clientProxyCatalog: ClientProxy =
    this.clientProxy.clientProxyCatalog();
  private clientProxyPayment: ClientProxy =
    this.clientProxy.clientProxyPayment();

  async findAll(): Promise<User[]> {
    const response = await this.clientProxyAuthorization
      .send(UserMSG.FIND_ALL, '')
      .toPromise();
    const { data } = response;
    return data;
  }

  async findOne(id: number): Promise<User> {
    const response = await this.clientProxyAuthorization
      .send(UserMSG.FIND_ONE, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async create(payload: userDto): Promise<User> {
    const response1 = await this.clientProxyAuthorization
      .send(UserMSG.CREATE, payload)
      .toPromise();
    const { data } = response1;

    const requestData = { username: payload.userName };
    const response2 = await this.clientProxyCart
      .send(UserMSG.CREATE, requestData)
      .toPromise();
    if (response2.data) {
      const data = Buffer.from(response2.data, 'base64').toString('utf-8');
      console.log(data);
    }
    return data;
  }

  async update(userName: string, payload: updateUserDto): Promise<User> {
    console.log(userName);
    console.log(payload);
    const response1 = await this.clientProxyAuthorization
      .send(UserMSG.UPDATE, { userName, payload })
      .toPromise();
    const { data } = response1;

    const requestData = {
      currentUsername: userName,
      newUsername: payload.userName,
    };
    const response2 = await this.clientProxyCart
      .send('EDIT_USER', requestData)
      .toPromise();
    if (response2.data) {
      const data = Buffer.from(response2.data, 'base64').toString('utf-8');
      console.log(data);
    }
    return data;
  }

  async delete(userName: string): Promise<User> {
    const response1 = await this.clientProxyAuthorization
      .send(UserMSG.DELETE, userName)
      .toPromise();
    const { data } = response1;

    const requestData = { username: userName };
    const response2 = await this.clientProxyCart
      .send(UserMSG.DELETE, requestData)
      .toPromise();
    if (response2.data) {
      const data = Buffer.from(response2.data, 'base64').toString('utf-8');
      console.log(data);
    }
    return data;
  }

  async validateUser(payload: loginDto) {
    const response1 = await this.clientProxyAuthorization
      .send('login', payload)
      .toPromise();

    const requestData = { username: payload.userName };
    const response2 = await this.clientProxyCart
      .send('GET_USERBYNAME', requestData)
      .toPromise();

    const data = Buffer.from(response2.data, 'base64').toString('utf-8');
    const jsonData = JSON.parse(data);

    const cartList = jsonData.cart.map((item) => ({
      id: item.id,
      product: item.product.name,
      quantity: item.quantity,
      orderId: item.order_id,
    }));

    let response3 = await this.clientProxyCatalog
      .send(ProductMSG.GET_PRICES, cartList)
      .toPromise();

    response3 = response3.data.filter((item) => item.orderId === 0);

    return { response1, response3 };
  }

  async updateJWT(userName: string, token: string) {
    const response = await this.clientProxyAuthorization
      .send(UserMSG.JWT, { userName, token })
      .toPromise();
    const { data } = response;
    return data;
  }

  async purchase(
    userName: string,
    itemsIDs: number[],
    productNames: productQty[],
  ) {
    const response1 = await this.clientProxyCatalog
      .send(ProductMSG.PURCHASE, productNames)
      .toPromise();

    const requestData = { username: userName, cartItemIDs: itemsIDs };
    const response2 = await this.clientProxyCart
      .send('CREATE_ORDER', requestData)
      .toPromise();
    if (response2.data) {
      const data = Buffer.from(response2.data, 'base64').toString('utf-8');
      console.log(data);
    }
    return response1.data;
  }

  async getOrders(userName: string) {
    const requestData = { username: userName };
    const response = await this.clientProxyCart
      .send('GET_ORDERSBYUSERNAME', requestData)
      .toPromise();
    const data = Buffer.from(response.data, 'base64').toString('utf-8');
    const jsonData = JSON.parse(data);
    console.log(jsonData);
    console.log(jsonData[1].items);
    return jsonData;
  }

  async createTransaction(amount: number) {
    const response = await this.clientProxyPayment
      .send(PaymentMSG.TRANSACTION, amount)
      .toPromise();

    return response;
  }

  async confirmTransaction(token: string) {
    const response = await this.clientProxyPayment
      .send(PaymentMSG.CONFIRM_PAYMENT, token)
      .toPromise();

    return response.status;
  }
}
