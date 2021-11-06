import { teamStub } from '../stubs/team.stub';

export const TeamService = jest.fn().mockReturnValue({
  //   getTeamById: jest.fn().mockResolvedValue(userStub()),
  //   getTeams: jest.fn().mockResolvedValue([userStub()]),

  create: jest.fn().mockResolvedValue(teamStub()),
  //   updateTeam: jest.fn().mockResolvedValue(userStub()),
});
