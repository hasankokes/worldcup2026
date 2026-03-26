import { Squad, type SquadProps } from '../../domain/entities/Squad';
import { DomainError } from '../../domain/errors/DomainError';
import type { ISquadRepository, IPlayerRepository } from '../../domain/ports';

export class CreateSquadUseCase {
  constructor(
    private readonly squadRepo: ISquadRepository,
    private readonly playerRepo: IPlayerRepository
  ) {}

  public async execute(props: SquadProps): Promise<Squad> {
    const existing = await this.squadRepo.getByUserId(props.userId);
    if (existing && existing.isLocked) {
      throw new DomainError('SQUAD_LOCKED', 'Cannot modify squad as it is currently locked');
    }

    const playerIds = props.players.map(p => p.playerId);
    const fullPlayersDetails = await this.playerRepo.getByIds(playerIds);
    
    if (fullPlayersDetails.length !== playerIds.length) {
      throw new DomainError('INVALID_PLAYERS', 'One or more players could not be found');
    }

    const newSquad = Squad.create(props, fullPlayersDetails);
    
    await this.squadRepo.save(newSquad);
    return newSquad;
  }
}

export class ValidateSquadUseCase {
  constructor(private readonly playerRepo: IPlayerRepository) {}

  public async execute(squadProps: SquadProps): Promise<{ isValid: boolean; reason?: string }> {
    try {
      const playerIds = squadProps.players.map(p => p.playerId);
      const fullPlayersDetails = await this.playerRepo.getByIds(playerIds);
      
      Squad.create(squadProps, fullPlayersDetails);
      return { isValid: true };
    } catch (error) {
       if (error instanceof DomainError) {
         return { isValid: false, reason: error.message };
       }
       throw error;
    }
  }
}
