import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { ProductMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
    constructor(private readonly clientProxy: ClientProxyMangaStore) { }
    private clientProxyProduct: ClientProxy = this.clientProxy.clientProxyProducts();

    async findAll(): Promise<Product> {
        const response = await this.clientProxyProduct.send(ProductMSG.FIND_ALL, '').toPromise();
        const { data } = response;
        return data;
    }
}
