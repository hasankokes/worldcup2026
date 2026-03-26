import type { IUserRepository, ISquadRepository, ITipRepository, IBracketRepository } from '../../domain/ports';
import { calculateWeightedTotal } from '../../scoring/weightedTotal';
import { Score } from '../../domain/valueObjects/Score';

export class CalculateWeightedTotalUseCase {
  public execute(fantasyScore: number, tipScore: number, bracketScore: number): Score {
    return new Score(fantasyScore, tipScore, bracketScore);
  }
}

export class GetLeaderboardUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  public async execute(limit: number = 100, offset: number = 0): Promise<any[]> {
    // In a real implementation this would likely call a read-model query 
    // or a specialized LeaderboardRepository port.
    // For now we represent the contract boundary.
    throw new Error('Not implemented: Requires specialized Leaderboard Projection Port');
  }
}
