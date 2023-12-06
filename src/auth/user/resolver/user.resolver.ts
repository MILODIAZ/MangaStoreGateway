import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ObjectType, Field } from '@nestjs/graphql';

import { User } from '../models/user.model';
import { userDto, updateUserDto, loginDto } from '../dto/user.dto';
import { UsersService } from '../service/user.service';
import { AuthService } from '../service/auth.service';

@ObjectType()
class AuthResult {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => User)
  user: User;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String, { nullable: true })
  jwt: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [User])
  async users() {
    return this.usersService.findAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => User)
  async createUser(@Args('data') data: userDto) {
    return this.usersService.create(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => User)
  async updateUser(
    @Args('data') data: updateUserDto,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.usersService.update(id, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.delete(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => AuthResult)
  async login(@Args('data') data: loginDto) {
    const user = await this.usersService.validateUser(data);
    const jwt = this.authService.generateJWT(user);
    console.log(jwt);
    if (jwt.access_token) {
      const userName = data.userName;
      const token: string = jwt.access_token;
      user.jwt = jwt.access_token;
      await this.usersService.updateJWT(userName, token);
    }
    return { user, jwt: jwt.access_token };
  }
}
