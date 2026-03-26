import { Tip, type TipProps } from '../../domain/entities/Tip';
import { DomainError } from '../../domain/errors/DomainError';
import type { ITipRepository, IMatchRepository } from '../../domain/ports';
import { calculateTipScore } from '../../scoring/tipScore';

export class SubmitTipUseCase {
  constructor(
    private readonly tipRepo: ITipRepository,
    private readonly matchRepo: IMatchRepository
  ) {}

  public async execute(props: TipProps): Promise<Tip> {
    const match = await this.matchRepo.getById(props.matchId);
    if (!match) {
      throw new DomainError('MATCH_NOT_FOUND', `Match ${props.matchId} not found`);
    }

    const existingTip = await this.tipRepo.getByUserIdAndMatchId(props.userId, props.matchId);
    if (existingTip && existingTip.isLocked) {
      throw new DomainError('TIP_LOCKED', 'This tip prediction is locked and cannot be changed');
    }

    const tip = Tip.create(props, match);
    await this.tipRepo.save(tip);
    
    return tip;
  }
}

export class CalculateTipScoreUseCase {
  constructor(
    private readonly tipRepo: ITipRepository,
    private readonly matchRepo: IMatchRepository
  ) {}

  public async execute(userId: string, matchId: string): Promise<number> {
    const tip = await this.tipRepo.getByUserIdAndMatchId(userId, matchId);
    const match = await this.matchRepo.getById(matchId);

    if (!tip || !match || !match.isFinished || match.homeScore == null || match.awayScore == null) {
      return 0;
    }

    return calculateTipScore(
      tip.predictedHome,
      tip.predictedAway,
      match.homeScore,
      match.awayScore
    );
  }
}
