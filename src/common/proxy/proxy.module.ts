import { Module } from '@nestjs/common';
import { ClientProxyMangaStore } from './client-proxy';

@Module({
  providers: [ClientProxyMangaStore],
  exports: [ClientProxyMangaStore],
})
export class ProxyModule {}
