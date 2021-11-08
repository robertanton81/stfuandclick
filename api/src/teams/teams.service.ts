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
import { Leaderboard } from './dtos/leaderboard.dto';

const teamProjection = {
  __v: false,
};

@Injectable()
export class TeamsService implements OnModuleInit {
  /**
   *
   * @param {TeamDocument} teamsModel
   * @constructor
   */
  constructor(
    @InjectModel(Team.name) private teamsModel: Model<TeamDocument>,
  ) {}

  /**
   * this is just arbitrary method to seed this sample app with
   * some data on every start
   */
  onModuleInit() {
    this.delteAll();
    this.createFake();
  }

  /**
   * orders the teams into ordered dict, based on click count
   * @returns {[key: int] : Team[]} ordered dict, base on highest clicks
   */
  async getLeaderboard(): Promise<Leaderboard> {
    const teams: Team[] = await this.list({});

    // init the object
    const ordr: { [key: number]: string[] } = { 0: [] };

    // fill the object with data
    // key is the click count found during itteration
    // value is the teamId
    for (let i = 0; i < teams.length; i++) {
      const team = new this.teamsModel(teams[i]);

      if (ordr[team.clicks]) {
        ordr[team.clicks].push(team._id);
      } else {
        ordr[team.clicks] = [team._id];
      }
    }

    // order the dict keys and start assigning the order
    // starts at 1 and increments with each iteration
    let order = 1;
    const leaderboard = Object.keys(ordr);
    // first sort the keys (number of clicks) of the ord object descending
    const sorted = leaderboard.sort((a, b) => parseInt(b) - parseInt(a));
    // create new object with key as the order and value as array of the teams on
    // given leaderboard rank
    const result: Leaderboard = sorted.reduce((acc, curr) => {
      const res = ordr[curr].map((a) => teams.find((t) => t._id === a._id));
      if (res.length > 0) {
        acc[order] = res;
        order++;
      }

      return acc;
    }, {});

    return result;
  }

  /**
   * create new team
   * @param {CreateTeamInput} payload
   * @returns {Team} team
   */
  async create(payload: CreateTeamInput): Promise<Team> {
    const createdTeam = new this.teamsModel(payload);
    return await createdTeam.save();
  }

  /**
   * find team by id
   * @param {string} id
   * @returns {Team}
   */
  async getById(id: string): Promise<Team> {
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

  /**
   * get all teams, base on optional filter criteria
   * @param {ListTeamInput} filters
   * @returns {Team[]}
   */
  async list(filters: ListTeamInput): Promise<Team[]> {
    return await this.teamsModel.find({ ...filters }, teamProjection).exec();
  }

  /**
   * update team
   * @param {UpdateTeamInput} payload
   * @returns
   */
  async update(payload: UpdateTeamInput): Promise<Team> {
    return await this.teamsModel
      .findByIdAndUpdate(payload.id, payload, { new: true })
      .exec();
  }

  /**
   * delete team based on id
   * @param {string} id
   * @returns
   */
  async delete(id: string): Promise<Team> {
    return this.teamsModel.findByIdAndDelete(id).exec();
  }

  /**
   * remove all teams
   * @returns
   */
  async delteAll() {
    return this.teamsModel.deleteMany();
  }

  /**
   * seed fake data into teams table
   */
  async createFake(): Promise<void> {
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
