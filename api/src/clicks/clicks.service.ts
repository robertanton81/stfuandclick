import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClickInput, UpdateClickInput } from './dtos/clicks.inputs';
import { Click, ClickDocument } from './schemas/click.model';
import { Team, TeamDocument } from '../teams/schemas/teams.model';
import { UpdateTeamInput } from 'src/teams/dtos/teams.inputs';

@Injectable()
export class ClicksService {
  constructor(
    @InjectModel(Click.name) private clicksModel: Model<ClickDocument>,
    @InjectModel(Team.name) private teamsModel: Model<TeamDocument>,
  ) {}

  async updateTeam(existingTeam) {
    if (!existingTeam) {
      throw new NotFoundException('team was not found');
    }

    const update: UpdateTeamInput = {
      id: existingTeam._id,
      clicks: existingTeam.clicks + 1,
    };

    await this.teamsModel
      .findByIdAndUpdate(existingTeam._id, update, { new: true })
      .exec();
  }

  // this creates or updates click for given session and team _id
  // it also updates team clicks
  async create(createClickInput: CreateClickInput) {
    const existingClick: Click = await this.find(createClickInput);
    const existingTeam: Team = await this.teamsModel
      .findById(createClickInput.teamId)
      .exec();

    if (existingClick !== null) {
      const input: UpdateClickInput = {
        clicks: existingClick.clicks + 1,
        id: existingClick._id,
      };

      if (existingTeam !== null) {
        this.updateTeam(existingTeam);
      }

      return await this.update(input);
    } else {
      const newClick: Click = {
        clicks: 1,
        session: createClickInput.session,
        teamId: createClickInput.teamId,
      };

      if (existingTeam !== null) {
        this.updateTeam(existingTeam);
      }

      return await this.clicksModel.create(newClick);
    }
  }

  async find(filters: CreateClickInput) {
    return await this.clicksModel.findOne({ ...filters }).exec();
  }

  async update(updateInput: UpdateClickInput) {
    return await this.clicksModel.findByIdAndUpdate(
      updateInput.id,
      updateInput,
      { new: true },
    );
  }
}
