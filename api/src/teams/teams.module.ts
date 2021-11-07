import { Module } from '@nestjs/common';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './teams.model';
import { TeamsController } from './teams.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
  ],
  providers: [TeamsResolver, TeamsService],
  controllers: [TeamsController],
})
export class TeamsModule {}
