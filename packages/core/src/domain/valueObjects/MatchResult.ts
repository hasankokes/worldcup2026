export type MatchOutcome = 'HOME' | 'AWAY' | 'DRAW';

export class MatchResult {
  constructor(
    public readonly homeScore: number,
    public readonly awayScore: number
  ) {}

  public get outcome(): MatchOutcome {
    const diff = this.homeScore - this.awayScore;
    if (diff > 0) return 'HOME';
    if (diff < 0) return 'AWAY';
    return 'DRAW';
  }

  public matches(other: MatchResult): boolean {
    return this.outcome === other.outcome;
  }

  public matchesExactly(other: MatchResult): boolean {
    return this.homeScore === other.homeScore && this.awayScore === other.awayScore;
  }
}
