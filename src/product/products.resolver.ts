import { Query, Resolver } from "@nestjs/graphql";
import { Product } from "./models/product.model";
import { ProductsService } from "./products.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver(of => Product)
export class ProductsResolver {
    constructor(
        private productsService: ProductsService) { }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query(returns => [Product])
    async products() {
        return this.productsService.findAll();
    }
}