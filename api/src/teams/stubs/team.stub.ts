import { Team } from '../schemas/teams.model';
import * as mongoose from 'mongoose';

export const teamStub = (): Team => {
  return {
    name: 'Guardians of the galaxy',
  };
};
