import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { TeamsModule } from './teams/teams.module';
import { ClicksModule } from './clicks/clicks.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env.prod'],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      include: [TeamsModule],
    }),
    DatabaseModule,
    TeamsModule,
    ClicksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
