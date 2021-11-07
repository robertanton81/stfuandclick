import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Team } from './schemas/teams.model';
import { TeamsService } from './teams.service';
import {
  CreateTeamInput,
  ListTeamInput,
  UpdateTeamInput,
} from './dtos/teams.inputs';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private teamService: TeamsService) {}

  @Query(() => Team)
  async team(@Args('id', { type: () => String }) id: string) {
    return this.teamService.getById(id);
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
  async deleteTeam(@Args('id', { type: () => String }) id: string) {
    return this.teamService.delete(id);
  }
}
