import { Test, TestingModule } from '@nestjs/testing';
import { teamStub } from '../stubs/team.stub';
import { TeamsController } from '../teams.controller';
import { CreateTeamInput } from '../dtos/teams.inputs';
import { Team } from '../schemas/teams.model';
import { TeamsService } from '../teams.service';

jest.mock('../teams.service');

describe('TeamsController', () => {
  let controller: TeamsController;
  let teamsService: TeamsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        TeamsService,
        { provide: TeamsService, useValue: teamsService },
      ],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
    teamsService = module.get<TeamsService>(TeamsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTeam', () => {
    describe('when createTeam is called', () => {
      let team: Team;
      let createTeamDto: CreateTeamInput;

      beforeEach(async () => {
        createTeamDto = teamStub();

        team = await controller.createTeam(createTeamDto);
      });

      test('then it should call TeamsService', () => {
        expect(teamsService.create).toHaveBeenCalledWith(createTeamDto);
      });

      test('then it should return a Team', () => {
        expect(team).toEqual(teamStub());
      });
    });
  });
});
