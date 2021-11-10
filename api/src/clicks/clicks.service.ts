import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
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

  /**
   * if tema was found by given id
   * the click count is incremented by 1
   * @param {Team} existingTeam
   */
  async _updateTeam(existingTeam) {
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

  /**
   *
   * @param {CreateClickInput} createClickInput
   * @returns {Click} updated or create click
   */
  async createOrUpdate(createClickInput: CreateClickInput): Promise<Click> {
    if (!isValidObjectId(createClickInput.teamId)) {
      throw new NotFoundException('team was not found');
    }

    const existingClick: Click = await this.clicksModel
      .findOne({
        teamId: createClickInput.teamId,
        session: createClickInput.session,
      })
      .exec();

    const existingTeam: Team = await this.teamsModel
      .findById(createClickInput.teamId)
      .exec();

    if (existingClick !== null) {
      const input: UpdateClickInput = {
        clicks: existingClick.clicks + 1,
        id: existingClick._id,
      };

      this._updateTeam(existingTeam);

      return await this.update(input);
    } else {
      const newClick: Click = {
        clicks: 1,
        session: createClickInput.session,
        teamId: createClickInput.teamId,
      };

      this._updateTeam(existingTeam);

      return await this.clicksModel.create(newClick);
    }
  }

  /**
   * finc click based on session and teamId
   * @param {CreateClickInput} filters
   * @returns {Click}
   */
  async find(filters: CreateClickInput) {
    return await this.clicksModel.findOne({ ...filters }).exec();
  }

  /**
   * updates a click, based on given teamId and session
   * @param {UpdateClickInput} updateInput
   * @returns {Click} updatedClick
   */
  async update(updateInput: UpdateClickInput) {
    return await this.clicksModel.findByIdAndUpdate(
      updateInput.id,
      updateInput,
      { new: true },
    );
  }
}
