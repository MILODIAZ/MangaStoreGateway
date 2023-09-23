import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Branch } from '../models/branch.model';
import { BranchesService } from '../service/branches.service';
import { StockItem } from '../models/stock-item.model';
import { branchInput } from '../dto/branch.dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Branch)
export class BranchesResolver {
  constructor(private branchesService: BranchesService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Branch])
  async branches() {
    return this.branchesService.findAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => Branch)
  async branch(@Args('id', { type: () => Int }) id: number) {
    return this.branchesService.findOne(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ResolveField('stockItems', (returns) => [StockItem])
  async stockItems(@Parent() branch: Branch) {
    const { id } = branch;
    return this.branchesService.getStockItems(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Branch)
  async createBranch(@Args('data') data: branchInput) {
    return this.branchesService.create(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Branch)
  async updateBranch(
    @Args('data') data: branchInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.branchesService.update(id, data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Branch)
  async deleteBranch(@Args('id', { type: () => Int }) id: number) {
    return this.branchesService.delete(id);
  }
}
