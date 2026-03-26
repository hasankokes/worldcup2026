import { ValidationError } from '../errors/DomainError';

export interface UserProps {
  id: string;
  username: string;
  email: string | null;
  lang: string;
  createdAt: string;
}

export class User {
  private constructor(public readonly props: UserProps) {}

  public get id(): string { return this.props.id; }
  public get username(): string { return this.props.username; }
  public get email(): string | null { return this.props.email; }
  public get lang(): string { return this.props.lang; }

  public static create(props: UserProps): User {
    if (!props.username || props.username.trim().length === 0) {
      throw new ValidationError('Username cannot be empty');
    }

    if (props.username.length < 3) {
      throw new ValidationError('Username must be at least 3 characters long');
    }

    const validLangs = ['en', 'tr', 'es'];
    if (!validLangs.includes(props.lang)) {
       throw new ValidationError(`Unsupported language: ${props.lang}`);
    }

    return new User({ ...props });
  }
}
