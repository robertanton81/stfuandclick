import { Module } from '@nestjs/common';
import { ClicksService } from './clicks.service';
import { ClicksResolver } from './clicks.resolver';
import { ClicksController } from './clicks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Click, ClickSchema } from './schemas/click.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Click.name, schema: ClickSchema }]),
  ],
  providers: [ClicksResolver, ClicksService],
  controllers: [ClicksController],
})
export class ClicksModule {}
