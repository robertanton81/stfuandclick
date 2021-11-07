import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        console.log(process.env);
        const ENV = configService.get('NODE_ENV');
        let URI = 'mongodb://mongodb:27017/clickApp';
        switch (ENV) {
          case 'development':
          case 'test':
            URI = configService.get('MONGO_DEV_CONNECTION_URI');
            break;
          case 'production':
            URI = configService.get('MONGO_CONNECTION_URI');
            break;
        }
        console.log(URI);

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
