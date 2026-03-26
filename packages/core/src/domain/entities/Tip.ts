import { ValidationError, BusinessRuleError } from '../errors/DomainError';
import type { Match } from './Match';

export interface TipProps {
  id: string;
  userId: string;
  matchId: string;
  predictedHome: number;
  predictedAway: number;
  isLocked: boolean;
  createdAt: string;
}

export class Tip {
  private constructor(public readonly props: TipProps) {}

  public get id(): string { return this.props.id; }
  public get userId(): string { return this.props.userId; }
  public get matchId(): string { return this.props.matchId; }
  public get predictedHome(): number { return this.props.predictedHome; }
  public get predictedAway(): number { return this.props.predictedAway; }
  public get isLocked(): boolean { return this.props.isLocked; }

  // Tip creation requires checking the target match's lock status
  public static create(props: TipProps, targetMatch: Match): Tip {
    if (props.predictedHome < 0 || props.predictedAway < 0) {
      throw new ValidationError('Predicted score cannot be negative');
    }

    if (!Number.isInteger(props.predictedHome) || !Number.isInteger(props.predictedAway)) {
      throw new ValidationError('Predicted score must be an integer');
    }

    // Business Rule Check
    if (targetMatch.isLocked) {
      throw new BusinessRuleError('Cannot predict a match that is already locked or started');
    }

    return new Tip({ 
      ...props, 
      isLocked: targetMatch.isLocked 
    });
  }
}
