import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/models/category.model';

@ObjectType()
export class Product {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  publicationDate: string;

  @Field({ nullable: true })
  author: string;

  @Field({ nullable: true })
  description: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  price: number;

  @Field({ nullable: true })
  image: string;

  @Field()
  isBlocked: boolean;

  @Field()
  isFavourite: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Int)
  totalStock: number;

  @Field()
  createAt: string;

  @Field()
  updateAt: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [Category], { nullable: 'items' })
  categories: Category[];
}
