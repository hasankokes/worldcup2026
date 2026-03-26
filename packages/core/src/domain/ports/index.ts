import type { Player } from '../entities/Player';
import type { Team } from '../entities/Team';
import type { Match } from '../entities/Match';
import type { Squad } from '../entities/Squad';
import type { Tip } from '../entities/Tip';
import type { Bracket } from '../entities/Bracket';
import type { User } from '../entities/User';
import type { Score } from '../valueObjects/Score';

export interface IPlayerRepository {
  getById(id: string): Promise<Player | null>;
  getByTeamId(teamId: string): Promise<Player[]>;
  getByIds(ids: string[]): Promise<Player[]>;
}

export interface ITeamRepository {
  getById(id: string): Promise<Team | null>;
  getAll(): Promise<Team[]>;
}

export interface IMatchRepository {
  getById(id: string): Promise<Match | null>;
  getActiveMatches(): Promise<Match[]>;
}

export interface ISquadRepository {
  getByUserId(userId: string): Promise<Squad | null>;
  save(squad: Squad): Promise<void>;
}

export interface ITipRepository {
  getByUserIdAndMatchId(userId: string, matchId: string): Promise<Tip | null>;
  save(tip: Tip): Promise<void>;
}

export interface IBracketRepository {
  getByUserId(userId: string): Promise<Bracket | null>;
  save(bracket: Bracket): Promise<void>;
}

export interface IUserRepository {
  getById(id: string): Promise<User | null>;
  getTotalScore(userId: string): Promise<Score | null>;
}
