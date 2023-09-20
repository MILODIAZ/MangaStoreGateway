import { Query, Resolver } from '@nestjs/graphql';
import { Branch } from './models/branch.model';
import { BranchesService } from './branches.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Branch)
export class BranchesResolver {
  constructor(private branchesService: BranchesService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Branch])
  async branches() {
    return this.branchesService.findAll();
  }
}
