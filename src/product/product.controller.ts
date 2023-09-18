import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductMSG } from 'src/common/constants';
import { CreateProductDto, UpdateProductDto, CreateProductStockDto, UpdateProductStockDto } from './product.dto';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly clientProxy: ClientProxyMangaStore) { }
  private clientProxyProduct = this.clientProxy.clientProxyProducts();

  @Get()
  findAll() {
    return this.clientProxyProduct.send(ProductMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxyProduct.send(ProductMSG.FIND_ONE, id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.clientProxyProduct.send(ProductMSG.CREATE, payload);
  }

  @Post('stock')
  createStock(@Body() payload: CreateProductStockDto) {
    return this.clientProxyProduct.send(ProductMSG.CREATE_STOCK, payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.clientProxyProduct.send(ProductMSG.UPDATE, { id, payload });
  }

  @Put('stock/:idStock')
  updateStock(
    @Param('idStock', ParseIntPipe) idStock: number,
    @Body() payload: UpdateProductStockDto,
  ) {
    return this.clientProxyProduct.send(ProductMSG.UPDATE_STOCK, { idStock, payload });
  }

  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.clientProxyProduct.send(ProductMSG.ADD_CAT_PROD, {
      id,
      categoryId,
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxyProduct.send(ProductMSG.DELETE, id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.clientProxyProduct.send(ProductMSG.DELETE_CAT_PROD, {
      id,
      categoryId,
    });
  }
}
