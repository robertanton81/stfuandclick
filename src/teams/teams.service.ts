import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Team, TeamDocument } from './teams.model';
import {
  CreateTeamInput,
  ListTeamInput,
  UpdateTeamInput,
} from './teams.inputs';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamsModel: Model<TeamDocument>,
  ) {}

  async create(payload: CreateTeamInput) {
    const createdTeam = new this.teamsModel(payload);
    return await createdTeam.save();
  }

  async getById(_id: string) {
    return await this.teamsModel.findById(_id).exec();
  }

  async list(filters: ListTeamInput) {
    return await this.teamsModel.find({ ...filters }).exec();
  }

  async update(payload: UpdateTeamInput) {
    return await this.teamsModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  async delete(_id: string) {
    return this.teamsModel.findByIdAndDelete(_id).exec();
  }
}
