import { ValidationError, BusinessRuleError } from '../errors/DomainError';
import { Formation } from '../valueObjects/Formation';
import type { Player } from './Player';

export interface SquadPlayerProps {
  playerId: string;
  isCaptain: boolean;
}

export interface SquadProps {
  id: string;
  userId: string;
  isLocked: boolean;
  lockedAt: string | null;
  createdAt: string;
  players: SquadPlayerProps[];
}

export class Squad {
  private constructor(public readonly props: SquadProps) {}

  public get id(): string { return this.props.id; }
  public get userId(): string { return this.props.userId; }
  public get isLocked(): boolean { return this.props.isLocked; }
  public get players(): SquadPlayerProps[] { return this.props.players; }

  public get captainId(): string | null {
    const captain = this.props.players.find(p => p.isCaptain);
    return captain ? captain.playerId : null;
  }

  public static create(props: SquadProps, fullPlayerDetails: Player[]): Squad {
    if (props.isLocked) {
      throw new BusinessRuleError('Cannot modify a locked squad');
    }

    if (props.players.length !== 11) {
      throw new ValidationError(`Squad must have exactly 11 players. Found ${props.players.length}.`);
    }

    if (fullPlayerDetails.length !== 11) {
      throw new Error('Internal Error: Provided full details count must match squad player count.');
    }

    // Validate Formation
    Formation.fromPlayers(fullPlayerDetails);

    // Validate Captain constraint
    const captains = props.players.filter(p => p.isCaptain);
    if (captains.length !== 1) {
      throw new ValidationError('A squad must have exactly 1 captain');
    }

    // Evaluate Country Rules
    const countryCounts: Record<string, number> = {};
    for (const player of fullPlayerDetails) {
      countryCounts[player.teamId] = (countryCounts[player.teamId] || 0) + 1;
      if (countryCounts[player.teamId] > 2) {
        throw new BusinessRuleError('A squad cannot have more than 2 players from the same country');
      }
    }

    return new Squad({ ...props });
  }

  public lock(lockedAtDate: string): Squad {
    return new Squad({
      ...this.props,
      isLocked: true,
      lockedAt: lockedAtDate
    });
  }
}
