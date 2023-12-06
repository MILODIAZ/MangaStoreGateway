import { ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

import { UserMSG } from 'src/common/constants';
import { ClientProxyMangaStore } from 'src/common/proxy/client-proxy';
import { User } from '../models/user.model';
import { userDto, updateUserDto, loginDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly clientProxy: ClientProxyMangaStore) {}
  private clientProxyAuthorization: ClientProxy =
    this.clientProxy.clientProxyAuthorization();

  async findAll(): Promise<User[]> {
    const response = await this.clientProxyAuthorization
      .send(UserMSG.FIND_ALL, '')
      .toPromise();
    const { data } = response;
    return data;
  }

  async findOne(id: number): Promise<User> {
    const response = await this.clientProxyAuthorization
      .send(UserMSG.FIND_ONE, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async create(payload: userDto): Promise<User> {
    const response = await this.clientProxyAuthorization
      .send(UserMSG.CREATE, payload)
      .toPromise();
    const { data } = response;
    return data;
  }

  async update(id: number, payload: updateUserDto): Promise<User> {
    const response = await this.clientProxyAuthorization
      .send(UserMSG.UPDATE, { id, payload })
      .toPromise();
    const { data } = response;
    return data;
  }

  async delete(id: number): Promise<User> {
    const response = await this.clientProxyAuthorization
      .send(UserMSG.DELETE, id)
      .toPromise();
    const { data } = response;
    return data;
  }

  async validateUser(payload: loginDto) {
    const response = await this.clientProxyAuthorization
      .send('login', payload)
      .toPromise();
    return response;
  }

  async updateJWT(userName: string, token: string) {
    const response = await this.clientProxyAuthorization
      .send(UserMSG.JWT, { userName, token })
      .toPromise();
    const { data } = response;
    return data;
  }
}
