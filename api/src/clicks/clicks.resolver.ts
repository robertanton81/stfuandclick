import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClicksService } from './clicks.service';
import { Click } from './schemas/click.model';
import { CreateClickInput } from './dtos/clicks.inputs';

@Resolver(() => Click)
export class ClicksResolver {
  constructor(private readonly clicksService: ClicksService) {}

  @Mutation(() => Click)
  createClick(@Args('createClickInput') createClickInput: CreateClickInput) {
    return this.clicksService.create(createClickInput);
  }
}
