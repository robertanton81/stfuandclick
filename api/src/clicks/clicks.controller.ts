import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ClicksService } from './clicks.service';
import { CreateClickInput } from './dtos/clicks.inputs';

@Controller('clicks')
@Injectable()
export class ClicksController {
  constructor(private readonly clicksService: ClicksService) {}

  @Post()
  createClick(@Body() createClickInput: CreateClickInput) {
    return this.clicksService.create(createClickInput);
  }
}
