import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Order {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;
}
