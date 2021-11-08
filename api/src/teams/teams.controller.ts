import { Body, Controller, Get, Injectable, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CreateTeamInput, GetTeamInput } from './dtos/teams.inputs';
import { TeamsService } from './teams.service';

@Controller()
@Injectable()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  /**
   *
   * @param id strign
   * @returns Team
   */
  @Get('team')
  getTeamById(@Query('id') param: GetTeamInput) {
    return this.teamsService.getById(param.id);
  }
  /**
   *
   * @returns Team[]
   */
  @Get('teams')
  listAllTeams() {
    return this.teamsService.list({});
  }

  @Get('/leaderboard')
  getLeaderboard() {
    return this.teamsService.getLeaderboard();
  }

  @Post()
  @ApiQuery({ name: 'create new team' })
  createTeam(@Body() createTeamInput: CreateTeamInput) {
    return this.teamsService.create(createTeamInput);
  }
}
