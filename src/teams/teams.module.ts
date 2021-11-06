import { Module } from '@nestjs/common';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';

@Module({
  providers: [TeamsResolver, TeamsService]
})
export class TeamsModule {}
