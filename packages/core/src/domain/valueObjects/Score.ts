export class Score {
  constructor(
    public readonly fantasy: number,
    public readonly tip: number,
    public readonly bracket: number
  ) {}

  public get weightedTotal(): number {
    return (this.fantasy * 0.40) + (this.tip * 0.35) + (this.bracket * 0.25);
  }

  public static initial(): Score {
    return new Score(0, 0, 0);
  }
}
