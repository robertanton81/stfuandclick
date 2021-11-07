import { Test, TestingModule } from '@nestjs/testing';
import { TeamsResolver } from '../teams.resolver';
import { TeamsService } from '../teams.service';

describe('TeamsResolver', () => {
  let resolver: TeamsResolver;
  const teamsService = jest.mock('../teams.service');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsResolver,
        {
          provide: TeamsService,
          useValue: teamsService,
        },
      ],
    }).compile();

    resolver = module.get<TeamsResolver>(TeamsResolver);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should have create function', () => {
    expect(resolver.createTeam).toBeDefined();
  });
});
