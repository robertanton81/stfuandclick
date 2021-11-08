import { Team } from '../schemas/teams.model';

export class Leaderboard {
  [order: number]: Team[];
}
