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

  create(payload: CreateTeamInput) {
    const createdTeam = new this.teamsModel(payload);
    return createdTeam.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.teamsModel.findById(_id).exec();
  }

  list(filters: ListTeamInput) {
    return this.teamsModel.find({ ...filters }).exec();
  }

  update(payload: UpdateTeamInput) {
    return this.teamsModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.teamsModel.findByIdAndDelete(_id).exec();
  }
}
