import { ClientProxy } from "@nestjs/microservices";
import { Injectable } from '@nestjs/common';

import { CategoryMSG } from "src/common/constants";
import { ClientProxyMangaStore } from "src/common/proxy/client-proxy";
import { Category } from "./models/category.model";

@Injectable()
export class CategoriesService {
    constructor(private readonly clientProxy: ClientProxyMangaStore) { }
    private clientProxyCategory: ClientProxy = this.clientProxy.clientProxyCategories();

    async findAll(): Promise<Category> {
        const response = await this.clientProxyCategory.send(CategoryMSG.FIND_ALL, '').toPromise();
        const { data } = response;
        return data;
    }
}