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

import { CategoryMSG } from 'src/common/constants';
import { CategoryDto } from './category.dto';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyCategory = this.clientProxy.clientProxyCategories();

  @Get()
  findAll() {
    return this.clientProxyCategory.send(CategoryMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxyCategory.send(CategoryMSG.FIND_ONE, id);
  }

  @Post()
  create(@Body() payload: CategoryDto) {
    return this.clientProxyCategory.send(CategoryMSG.CREATE, payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: CategoryDto) {
    return this.clientProxyCategory.send(CategoryMSG.UPDATE, { id, payload });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxyCategory.send(CategoryMSG.DELETE, id);
  }
}
