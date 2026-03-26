import { ValidationError } from '../errors/DomainError';

export interface InviteProps {
  id: string;
  inviterId: string;
  code: string;
  usedCount: number;
  createdAt: string;
}

export class Invite {
  private constructor(public readonly props: InviteProps) {}

  public get id(): string { return this.props.id; }
  public get inviterId(): string { return this.props.inviterId; }
  public get code(): string { return this.props.code; }
  public get usedCount(): number { return this.props.usedCount; }

  public static create(props: InviteProps): Invite {
    if (!props.code || props.code.trim().length < 6) {
      throw new ValidationError('Invite code must be at least 6 characters');
    }

    if (props.usedCount < 0) {
      throw new ValidationError('Used count cannot be negative');
    }

    return new Invite({ ...props });
  }

  public trackUsage(): Invite {
    return new Invite({
      ...this.props,
      usedCount: this.props.usedCount + 1
    });
  }
}
