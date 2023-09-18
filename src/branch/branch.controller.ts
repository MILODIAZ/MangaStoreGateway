import {
    Body,
    Controller,
    Get,
    Put,
    Param,
    ParseIntPipe,
    Post,
    Delete
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BranchDto } from './branch.dto';
import { BranchMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';

@ApiTags('branches')
@Controller('branches')
export class BranchController {
    constructor(private readonly clientProxy: ClientProxyMangaStore) { }
    private clientProxyBranch = this.clientProxy.clientProxyBranches();

    @Get()
    findAll() {
        return this.clientProxyBranch.send(BranchMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.clientProxyBranch.send(BranchMSG.FIND_ONE, id);
    }

    @Post()
    create(@Body() payload: BranchDto) {
        return this.clientProxyBranch.send(BranchMSG.CREATE, payload);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: BranchDto) {
        return this.clientProxyBranch.send(BranchMSG.UPDATE, { id, payload });
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.clientProxyBranch.send(BranchMSG.DELETE, id);
    }
}