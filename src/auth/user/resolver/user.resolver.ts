import {
  Args,
  InputType,
  Int,
  Mutation,
  Query,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [CartItemPrice], { nullable: true }) // Cambiado a [Object]
  cart: CartItemPrice[];
}

@ObjectType()
class CartItemPrice {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String)
  product: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  quantity: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  total: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  orderId: number;
}

@ObjectType()
class orderUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String, { nullable: true })
  username: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [CartItem], { nullable: true }) // Cambiado a [Object]
  cart: CartItem[];
}

@ObjectType()
class Orden {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  user_id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => orderUser)
  user: orderUser;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [CartItem], { nullable: true })
  items: CartItem[];
}

@ObjectType()
class CartProduct {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String, { nullable: true })
  name: string;
}

@ObjectType()
class CartItem {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  product_id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => CartProduct)
  product: CartProduct;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  quantity: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  order: number;
}

@InputType()
export class productQty {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String, { nullable: true })
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  quantity: number;
}

@ObjectType()
class Transaction {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String, { nullable: true })
  token: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String, { nullable: true })
  url: string;
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
  @Query((returns) => [Orden])
  async getOrders(@Args('userName', { type: () => String }) userName: string) {
    return this.usersService.getOrders(userName);
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
    @Args('userName', { type: () => String }) userName: string,
  ) {
    return this.usersService.update(userName, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => User)
  async deleteUser(@Args('userName', { type: () => String }) userName: string) {
    return this.usersService.delete(userName);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => AuthResult)
  async login(@Args('data') data: loginDto) {
    const result = await this.usersService.validateUser(data);
    const user = result.response1;
    const cart = result.response3;
    const jwt = this.authService.generateJWT(user);
    if (jwt.access_token) {
      const userName = data.userName;
      const token: string = jwt.access_token;
      user.jwt = jwt.access_token;
      await this.usersService.updateJWT(userName, token);
    }

    return { user, jwt: jwt.access_token, cart };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => String)
  async purchase(
    @Args('userName', { type: () => String }) userName: string,
    @Args('itemsIDs', { type: () => [Int] }) itemIDs: number[],
    @Args('productNames', { type: () => [productQty] })
    productNames: productQty[],
  ) {
    return this.usersService.purchase(userName, itemIDs, productNames);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Transaction)
  async createTransaction(@Args('amount', { type: () => Int }) amount: number) {
    return this.usersService.createTransaction(amount);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => String)
  async confirmTransaction(
    @Args('token', { type: () => String }) token: string,
  ) {
    return this.usersService.confirmTransaction(token);
  }
}
