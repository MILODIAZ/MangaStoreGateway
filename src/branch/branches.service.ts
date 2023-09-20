import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { Branch } from './models/branch.model';
import { BranchMSG, StockItemMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';

@Injectable()
export class BranchesService {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyBranch: ClientProxy =
    this.clientProxy.clientProxyBranches();

  async findAll(): Promise<Branch[]> {
    const response = await this.clientProxyBranch
      .send(BranchMSG.FIND_ALL, '')
      .toPromise();
    const { data } = response;
    return data;
  }

  async findOne(id: number): Promise<Branch> {
    const response = await this.clientProxyBranch
      .send(BranchMSG.FIND_ONE, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async findOneByStockItem(id: number): Promise<Branch> {
    const response = await this.clientProxyBranch
      .send(StockItemMSG.GET_BRANCH, id)
      .toPromise();
    const { data } = response;
    return data;
  }
}
