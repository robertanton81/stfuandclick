import { Team } from '../teams.model';

export const teamStub = (): Omit<Team, '_id'> => {
  return {
    name: 'Guardians of the galaxy',
    clicks: 5,
  };
};
