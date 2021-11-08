import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClickInput, UpdateClickInput } from './dtos/clicks.inputs';
import { Click, ClickDocument } from './schemas/click.model';

@Injectable()
export class ClicksService {
  constructor(
    @InjectModel(Click.name) private clicksModel: Model<ClickDocument>,
  ) {}
  async create(createClickInput: CreateClickInput) {
    const existingClick: Click = await this.find(createClickInput);
    if (existingClick !== null) {
      const input: UpdateClickInput = {
        clicks: existingClick.clicks + 1,
        id: existingClick._id,
      };

      return await this.update(input);
    } else {
      const newClick: Click = {
        clicks: 1,
        session: createClickInput.session,
        teamId: createClickInput.teamId,
      };
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
