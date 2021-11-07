import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const ENV = configService.get('NODE_ENV');
        let URI = 'mongodb://mongodb:27017/clickApp';
        // this is handling the docker and outside docker development
        // in real life there would be a stnadalone integration db, but now due to
        // free tier limitations, there is one db, so in case of running the e2e module test,
        // all data would be lost
        switch (ENV) {
          case 'development':
          case 'test':
            if (configService.get('DOCKER_DEV') === 'true') {
              URI = configService.get('MONGO_DEV_CONNECTION_URI');
            } else {
              URI = configService.get('MONGO_CONNECTION_URI');
            }
            break;
          default:
            URI = configService.get('MONGO_CONNECTION_URI');
        }

        return {
          uri: URI,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
