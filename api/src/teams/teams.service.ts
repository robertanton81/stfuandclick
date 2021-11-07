import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import * as faker from 'faker';

import { Team, TeamDocument } from './schemas/teams.model';
import {
  CreateTeamInput,
  ListTeamInput,
  UpdateTeamInput,
} from './teams.inputs';

@Injectable()
export class TeamsService implements OnModuleInit {
  constructor(
    @InjectModel(Team.name) private teamsModel: Model<TeamDocument>,
  ) {}
  onModuleInit() {
    this.delteAll();
    this.createFake();
  }

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

  async delteAll() {
    return this.teamsModel.deleteMany();
  }

  async createFake() {
    [...Array(10).keys()].map(() => {
      const fakeTeam = faker.name.firstName();
      // return this.create({ name: `${fakeTeam}'s team'` });
      return this.create({ name: `${fakeTeam}'s team'` });
    });
  }
}
