# Clean Architecture & Domain Layer Rules

This project enforces Strict Clean Architecture, specifically within the `@wc2026/core` package.

## 1. The Dependency Rule
- Source code dependencies must point **inward**, toward the Domain Entities.
- The `packages/core` directory is agnostic. It knows **nothing** about React Native, Expo, Supabase, APIs, or databases.
- **NO FRAMEWORK IMPORTS** are allowed inside `packages/core`.

## 2. Directory Structure (`@wc2026/core/src`)

### `domain/entities/`
- Rich models with behavior and validation rules.
- Must encapsulate business rules (e.g., "Squad gets locked 5 minutes before match").
- Data enters via `static create(...)` factory methods that perform domain validation.

### `domain/valueObjects/`
- Immutable objects that have no identity (e.g., `Score`, `Formation`).
- Two Value Objects with the same values are considered identical.

### `domain/ports/`
- Interfaces for repositories (e.g., `ISquadRepository`).
- This marks the **Dependency Inversion** boundary. The application layer defines *what* it needs without knowing *how* it's stored.

### `useCases/`
- Application-specific business rules.
- Orchestrates the flow of data to and from the domain entities.
- Must receive Data Access implementations via Constructor Injection from the `apps/` layer.

## 3. Implementation in the App Layer (`apps/mobile`, `supabase/functions`)

The outer layers (UI, edge functions) are responsible for implementing the `ports`:

```typescript
// Example: apps/mobile/infrastructure/SupabaseSquadRepository.ts
import type { ISquadRepository, Squad } from '@wc2026/core';

export class SupabaseSquadRepository implements ISquadRepository {
  async save(squad: Squad): Promise<void> {
    // Supabase specific insert logic here...
  }
}
```

When invoking a use case in a React Native component or Edge Function:
```typescript
const squadRepo = new SupabaseSquadRepository();
const playerRepo = new SupabasePlayerRepository();
const createSquad = new CreateSquadUseCase(squadRepo, playerRepo);

await createSquad.execute(props);
```

## 4. Exceptions and Error Handling
- Use the classes defined in `domain/errors/DomainError.ts`.
- `ValidationError`: Input format errors (e.g., missing name).
- `BusinessRuleError`: Invalid states (e.g., more than 2 players from one country).
