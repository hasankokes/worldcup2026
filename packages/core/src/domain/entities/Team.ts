import { ValidationError } from '../errors/DomainError';

export interface TeamProps {
  id: string;
  name: string;
  countryCode: string; // ISO 3166-1 alpha-2 e.g., "TR", "US"
  groupId: string;     // e.g., "A", "B", "C"
}

export class Team {
  private constructor(public readonly props: TeamProps) {}

  public get id(): string { return this.props.id; }
  public get name(): string { return this.props.name; }
  public get countryCode(): string { return this.props.countryCode; }
  public get groupId(): string { return this.props.groupId; }

  public static create(props: TeamProps): Team {
    if (!props.name || props.name.trim().length === 0) {
      throw new ValidationError('Team name cannot be empty');
    }
    if (!props.countryCode || props.countryCode.length !== 2) {
      throw new ValidationError('Country code must be a 2-letter ISO code');
    }
    
    return new Team({ ...props });
  }
}
