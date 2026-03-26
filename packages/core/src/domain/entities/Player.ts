import { ValidationError } from '../errors/DomainError';

export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD';

export interface PlayerProps {
  id: string;
  teamId: string;
  name: string;
  position: PlayerPosition;
  apiExternalId: string;
}

export class Player {
  private constructor(public readonly props: PlayerProps) {}

  public get id(): string { return this.props.id; }
  public get teamId(): string { return this.props.teamId; }
  public get name(): string { return this.props.name; }
  public get position(): PlayerPosition { return this.props.position; }
  public get apiExternalId(): string { return this.props.apiExternalId; }

  public static create(props: PlayerProps): Player {
    if (!props.name || props.name.trim().length === 0) {
      throw new ValidationError('Player name cannot be empty');
    }
    
    const validPositions: PlayerPosition[] = ['GK', 'DEF', 'MID', 'FWD'];
    if (!validPositions.includes(props.position)) {
      throw new ValidationError(`Invalid player position: ${props.position}`);
    }
    
    return new Player({ ...props });
  }
}
