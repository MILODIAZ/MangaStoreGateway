import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { Branch } from '../models/branch.model';
import { BranchMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { StockItem } from '../models/stock-item.model';
import { branchInput } from '../dto/branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyCatalog: ClientProxy =
    this.clientProxy.clientProxyCatalog();

  async findAll(): Promise<Branch[]> {
    const response = await this.clientProxyCatalog
      .send(BranchMSG.FIND_ALL, '')
      .toPromise();
    const { data } = response;
    return data;
  }

  async findOne(id: number): Promise<Branch> {
    const response = await this.clientProxyCatalog
      .send(BranchMSG.FIND_ONE, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async getStockItems(id: number): Promise<StockItem[]> {
    const response = await this.clientProxyCatalog
      .send(BranchMSG.GET_STOCK_ITEMS, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async create(payload: branchInput): Promise<Branch> {
    const response = await this.clientProxyCatalog
      .send(BranchMSG.CREATE, payload)
      .toPromise();
    const { data } = response;
    return data;
  }

  async update(id: number, payload: branchInput): Promise<Branch> {
    const response = await this.clientProxyCatalog
      .send(BranchMSG.UPDATE, { id, payload })
      .toPromise();
    const { data } = response;
    return data;
  }

  async delete(id: number): Promise<Branch> {
    const response = await this.clientProxyCatalog
      .send(BranchMSG.DELETE, id)
      .toPromise();
    const { data } = response;
    return data;
  }
}
