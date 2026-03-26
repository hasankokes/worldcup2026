import { ValidationError, BusinessRuleError } from '../errors/DomainError';
import { BracketPhase, BRACKET_PHASES } from '../../stateMachine/bracketPhases';

export interface BracketPickProps {
  stage: BracketPhase;
  position: number;
  teamId: string;
}

export interface BracketProps {
  id: string;
  userId: string;
  isGroupLocked: boolean;
  isR16Locked: boolean;
  isQfLocked: boolean;
  isSfLocked: boolean;
  createdAt: string;
  picks: BracketPickProps[];
}

export class Bracket {
  private constructor(public readonly props: BracketProps) {}

  public get id(): string { return this.props.id; }
  public get userId(): string { return this.props.userId; }
  public get picks(): BracketPickProps[] { return this.props.picks; }

  public isPhaseLocked(phase: BracketPhase): boolean {
    switch(phase) {
      case BRACKET_PHASES.GROUP: return this.props.isGroupLocked;
      case BRACKET_PHASES.R16: return this.props.isR16Locked;
      case BRACKET_PHASES.QF: return this.props.isQfLocked;
      case BRACKET_PHASES.SF: return this.props.isSfLocked;
      case BRACKET_PHASES.FINAL: return this.props.isSfLocked; // Final locks with SF
      default: return true;
    }
  }

  public static create(props: BracketProps, currentTournamentPhase: BracketPhase): Bracket {
    const bracket = new Bracket({ ...props });

    // Validate that user is not submitting picks for a locked phase
    for (const pick of props.picks) {
      if (bracket.isPhaseLocked(pick.stage)) {
        throw new BusinessRuleError(`Phase ${pick.stage} is locked. Picks cannot be submitted.`);
      }

      const phaseOrder = Object.values(BRACKET_PHASES);
      const targetIndex = phaseOrder.indexOf(pick.stage);
      const currentIndex = phaseOrder.indexOf(currentTournamentPhase);
      
      if (targetIndex < currentIndex) {
         throw new BusinessRuleError(`Cannot edit picks for past phase: ${pick.stage}`);
      }
    }

    return bracket;
  }
}
