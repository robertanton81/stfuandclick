import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { CreateTeamInput } from './teams.inputs';
import { TeamsService } from './teams.service';

@Controller('teams')
@Injectable()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  listAllTeams() {
    return this.teamsService.list({});
  }

  @Post()
  createTeam(@Body() createTeamInput: CreateTeamInput) {
    return this.teamsService.create(createTeamInput);
  }
}
