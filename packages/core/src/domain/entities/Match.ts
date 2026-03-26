import { ValidationError } from '../errors/DomainError';
import { differenceInMinutes } from 'date-fns';

export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'FT';

export interface MatchProps {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  scheduledAt: string; // ISO 8601
  status: MatchStatus;
  stage: string;
  homeScore?: number | null;
  awayScore?: number | null;
}

export class Match {
  private constructor(public readonly props: MatchProps) {}

  public get id(): string { return this.props.id; }
  public get homeTeamId(): string { return this.props.homeTeamId; }
  public get awayTeamId(): string { return this.props.awayTeamId; }
  public get scheduledAt(): string { return this.props.scheduledAt; }
  public get status(): MatchStatus { return this.props.status; }
  public get stage(): string { return this.props.stage; }
  public get homeScore(): number | null { return this.props.homeScore ?? null; }
  public get awayScore(): number | null { return this.props.awayScore ?? null; }

  public get isLocked(): boolean {
    const scheduledDate = new Date(this.scheduledAt);
    const diff = differenceInMinutes(scheduledDate, new Date());
    return diff <= 5;
  }

  public get isFinished(): boolean {
    return this.status === 'FT';
  }

  public static create(props: MatchProps): Match {
    if (props.homeTeamId === props.awayTeamId) {
      throw new ValidationError('A team cannot play against itself');
    }

    if (isNaN(Date.parse(props.scheduledAt))) {
      throw new ValidationError(`Invalid scheduledAt date format: ${props.scheduledAt}`);
    }

    if (props.status === 'FT' && (props.homeScore == null || props.awayScore == null)) {
      throw new ValidationError('Finished match must have a score');
    }

    return new Match({ ...props });
  }
}
