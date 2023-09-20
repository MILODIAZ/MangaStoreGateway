import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { StockItemMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { StockItem } from './models/stock-item.model';

@Injectable()
export class StockItemsService {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyStockItems: ClientProxy =
    this.clientProxy.clientProxyStockItems();

  async findAll(): Promise<StockItem[]> {
    const response = await this.clientProxyStockItems
      .send(StockItemMSG.FIND_ALL, '')
      .toPromise();
    const { data } = response;
    return data;
  }
}
