import { Query, Resolver } from "@nestjs/graphql";
import { Category } from "./models/category.model";
import { CategoriesService } from "./categories.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver(of => Category)
export class CategoriesResolver {
    constructor(
        private categoriesService: CategoriesService) { }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query(returns => [Category])
    async categories() {
        return this.categoriesService.findAll();
    }
}