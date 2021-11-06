import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Team } from './teams.model';
import { TeamsService } from './teams.service';
import {
  CreateTeamInput,
  ListTeamInput,
  UpdateTeamInput,
} from './teams.inputs';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private teamService: TeamsService) {}

  @Query(() => Team)
  async team(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.teamService.getById(_id);
  }

  @Query(() => [Team])
  async teams(@Args('filters', { nullable: true }) filters?: ListTeamInput) {
    return this.teamService.list(filters);
  }

  @Mutation(() => Team)
  async createTeam(@Args('payload') payload: CreateTeamInput) {
    return this.teamService.create(payload);
  }

  @Mutation(() => Team)
  async updateTeam(@Args('payload') payload: UpdateTeamInput) {
    return this.teamService.update(payload);
  }

  @Mutation(() => Team)
  async deleteTeam(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.teamService.delete(_id);
  }
}
