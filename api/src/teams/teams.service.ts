import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import * as faker from 'faker';

import { Team, TeamDocument } from './schemas/teams.model';
import {
  CreateTeamInput,
  ListTeamInput,
  UpdateTeamInput,
} from './dtos/teams.inputs';

const teamProjection = {
  __v: false,
};

@Injectable()
export class TeamsService implements OnModuleInit {
  constructor(
    @InjectModel(Team.name) private teamsModel: Model<TeamDocument>,
  ) {}

  onModuleInit() {
    this.delteAll();
    this.createFake();
  }

  async getLeaderboard() {
    const teams: Team[] = await this.list({});

    const ordr: { [key: number]: string[] } = { 0: [] };

    for (let i = 0; i < teams.length; i++) {
      const team = new this.teamsModel(teams[i]);

      if (ordr[team.clicks]) {
        ordr[team.clicks].push(team._id);
      } else {
        ordr[team.clicks] = [team._id];
      }
    }

    let order = 1;
    const leaderboard = Object.keys(ordr);
    const sorted = leaderboard.sort((a, b) => parseInt(b) - parseInt(a));
    const result = sorted.reduce((acc, curr) => {
      const res = ordr[curr].map((a) => teams.find((t) => t._id === a._id));
      if (res.length > 0) {
        acc[order] = res;
        order++;
      }

      return acc;
    }, {});

    return result;
  }

  async create(payload: CreateTeamInput) {
    const createdTeam = new this.teamsModel(payload);
    return await createdTeam.save();
  }

  async getById(id: string) {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('team was not found');
    }

    const found = await this.teamsModel.findById(id).exec();
    if (found) {
      return found;
    } else {
      throw new NotFoundException('team was not found');
    }
  }

  async list(filters: ListTeamInput) {
    return await this.teamsModel.find({ ...filters }, teamProjection).exec();
  }

  async update(payload: UpdateTeamInput) {
    return await this.teamsModel
      .findByIdAndUpdate(payload.id, payload, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.teamsModel.findByIdAndDelete(id).exec();
  }

  async delteAll() {
    return this.teamsModel.deleteMany();
  }

  async createFake() {
    [...Array(30).keys()].map(async () => {
      const fakeTeamName = faker.name.firstName();
      const fakeTeam: Team = {
        name: fakeTeamName,
        clicks: faker.datatype.number({ nin: 2, max: 80 }),
      };

      const createdTeam = new this.teamsModel({ ...fakeTeam });
      return await createdTeam.save();
    });
  }
}
