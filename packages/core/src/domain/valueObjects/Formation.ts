import { ValidationError } from '../errors/DomainError';
import type { Player, PlayerPosition } from '../entities/Player';

export class Formation {
  constructor(
    public readonly gk: number,
    public readonly def: number,
    public readonly mid: number,
    public readonly fwd: number
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.gk !== 1) {
      throw new ValidationError('A squad must have exactly 1 Goalkeeper');
    }
    if (this.def < 3) {
      throw new ValidationError('A squad must have at least 3 Defenders');
    }
    if (this.mid < 2) {
      throw new ValidationError('A squad must have at least 2 Midfielders');
    }
    if (this.fwd < 1) {
      throw new ValidationError('A squad must have at least 1 Forward');
    }
    if (this.gk + this.def + this.mid + this.fwd !== 11) {
      throw new ValidationError('A formation must consist of exactly 11 players');
    }
  }

  public static fromPlayers(players: Player[]): Formation {
    const counts: Record<PlayerPosition, number> = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
    players.forEach(p => counts[p.position]++);
    
    return new Formation(counts.GK, counts.DEF, counts.MID, counts.FWD);
  }
}
