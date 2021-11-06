import { Controller, Get, Injectable } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
@Injectable()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  listAllTeams() {
    return this.teamsService.list({ name: 'FantasticFour' });
  }
}
