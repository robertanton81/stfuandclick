import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClicksService } from './clicks.service';
import { CreateClickInput } from './dtos/clicks.inputs';
import { Click } from './schemas/click.model';

@Controller('clicks')
@Injectable()
@ApiTags('clicks')
export class ClicksController {
  constructor(private readonly clicksService: ClicksService) {}

  @Post()
  @ApiOperation({ summary: 'record a click for team and session' })
  async createClick(
    @Body() createClickInput: CreateClickInput,
  ): Promise<Click> {
    return await this.clicksService.createOrUpdate(createClickInput);
  }
}
