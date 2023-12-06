import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import config from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './user/service/auth.service';
import { UsersResolver } from './user/resolver/user.resolver';
import { UsersService } from './user/service/user.service';

@Module({
  imports: [
    ProxyModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.JwtSecret,
        };
      },
    }),
  ],
  providers: [
    ClientProxyMangaStore,
    AuthService,
    JwtStrategy,
    UsersResolver,
    UsersService,
  ],
})
export class AuthModule {}
