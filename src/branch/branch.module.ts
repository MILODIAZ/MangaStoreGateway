import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports : [ProxyModule],
  controllers: [BranchController]
})
export class BranchModule {}
