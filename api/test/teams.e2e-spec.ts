import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { DatabaseService } from '../src/database/database.service';
import * as request from 'supertest';
import { teamStub } from '../src/teams/stubs/team.stub';

import { AppModule } from '../src/app.module';
import { CreateTeamInput } from '../src/teams/dtos/teams.inputs';

jest.setTimeout(10000);

describe('TeamsController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('teams').deleteMany({});
  });

  describe('getTeams', () => {
    it('should return an array of teams', async () => {
      await dbConnection.collection('teams').insertOne(teamStub());
      const response = await request(httpServer).get('/teams');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([teamStub()]);
    });
  });

  describe('createTeam', () => {
    it('should create a user', async () => {
      const createUserRequest: CreateTeamInput = {
        name: teamStub().name,
      };
      const response = await request(httpServer)
        .post('/teams')
        .send(createUserRequest);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createUserRequest);

      const user = await dbConnection
        .collection('teams')
        .findOne({ name: createUserRequest.name });
      expect(user).toMatchObject(createUserRequest);
    });
  });
});
