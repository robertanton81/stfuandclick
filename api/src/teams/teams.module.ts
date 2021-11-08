import { Module } from '@nestjs/common';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './schemas/teams.model';
import { TeamsController } from './teams.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
  ],
  providers: [TeamsResolver, TeamsService],
  controllers: [TeamsController],
  exports: [TeamsService],
})
export class TeamsModule {}
