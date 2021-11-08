import { Module } from '@nestjs/common';
import { ClicksService } from './clicks.service';
import { ClicksResolver } from './clicks.resolver';
import { ClicksController } from './clicks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Click, ClickSchema } from './schemas/click.model';
import { TeamsModule } from '../teams/teams.module';
import { Team } from 'src/teams/schemas/teams.model';
import { TeamSchema } from '../teams/schemas/teams.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Click.name, schema: ClickSchema },
      { name: Team.name, schema: TeamSchema },
    ]),
    TeamsModule,
  ],
  providers: [ClicksResolver, ClicksService],
  controllers: [ClicksController],
})
export class ClicksModule {}
