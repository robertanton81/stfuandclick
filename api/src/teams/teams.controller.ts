import { Body, Controller, Get, Injectable, Post, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Leaderboard } from './dtos/leaderboard.dto';
import { CreateTeamInput } from './dtos/teams.inputs';
import { Team } from './schemas/teams.model';
import { TeamsService } from './teams.service';

@Controller()
@Injectable()
@ApiTags('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  /**
   *
   * @param id strign
   * @returns Team
   */
  @Get('team')
  @ApiOperation({ summary: 'get the team by id' })
  @ApiOkResponse({ type: Team, description: 'get team gy id' })
  @ApiNotFoundResponse({ description: 'No team was found for given id' })
  async getTeamById(@Query('id') param: string): Promise<Team> {
    return await this.teamsService.getById(param);
  }
  /**
   *
   * @returns Team[]
   */
  @Get('teams')
  @ApiOperation({ summary: 'get list of all teams' })
  @ApiOkResponse({
    type: [Team],
  })
  async listAllTeams(): Promise<Team[]> {
    return await this.teamsService.list({});
  }

  /**
   *
   * @returns list of teams with their order
   */
  @Get('/leaderboard')
  @ApiOperation({ summary: 'get leaderboard' })
  @ApiOkResponse({
    description: 'get teams and their rank',
    schema: {
      example: {
        '1': [
          {
            _id: '61893491ed42f160a80822bb',
            clicks: 79,
            name: 'Emery',
          },
          {
            _id: '61893491ed42f160a80822c0',
            clicks: 79,
            name: 'Sigurd',
          },
        ],
      },
    },
  })
  async getLeaderboard(): Promise<Leaderboard> {
    return await this.teamsService.getLeaderboard();
  }

  /**
   * create new team with given name
   * @param {CreateTeamInput} createTeamInput
   * @returns
   */
  @Post()
  @ApiOperation({ summary: 'create team with given name' })
  async createTeam(@Body() createTeamInput: CreateTeamInput): Promise<Team> {
    return await this.teamsService.create(createTeamInput);
  }
}
