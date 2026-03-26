import { Bracket, type BracketProps, type BracketPickProps } from '../../domain/entities/Bracket';
import { DomainError } from '../../domain/errors/DomainError';
import type { IBracketRepository } from '../../domain/ports';
import { type BracketPhase, getNextPhase } from '../../stateMachine/bracketPhases';
import { calculateBracketScore } from '../../scoring/bracketScore';

export class SubmitBracketPicksUseCase {
  constructor(private readonly bracketRepo: IBracketRepository) {}

  public async execute(
    userId: string, 
    stage: BracketPhase, 
    newPicks: BracketPickProps[],
    currentTournamentPhase: BracketPhase
  ): Promise<Bracket> {
    const existingBracket = await this.bracketRepo.getByUserId(userId);
    
    let props: BracketProps;

    if (existingBracket) {
      // Merge picks
      const filteredPicks = existingBracket.picks.filter(p => p.stage !== stage);
      props = {
        ...existingBracket.props,
        picks: [...filteredPicks, ...newPicks]
      };
    } else {
      props = {
        id: crypto.randomUUID(),
        userId,
        isGroupLocked: false,
        isR16Locked: false,
        isQfLocked: false,
        isSfLocked: false,
        createdAt: new Date().toISOString(),
        picks: newPicks
      };
    }

    const bracket = Bracket.create(props, currentTournamentPhase);
    await this.bracketRepo.save(bracket);
    
    return bracket;
  }
}

export class CalculateBracketScoreUseCase {
  constructor(private readonly bracketRepo: IBracketRepository) {}

  public async execute(
    userId: string, 
    actualAdvancements: { stage: string; teamId: string }[]
  ): Promise<number> {
    const bracket = await this.bracketRepo.getByUserId(userId);
    if (!bracket) return 0;

    return calculateBracketScore(bracket.picks, actualAdvancements);
  }
}
