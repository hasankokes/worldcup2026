export const BRACKET_PHASES = {
  GROUP: 'GROUP',
  R16: 'R16',
  QF: 'QF',
  SF: 'SF',
  FINAL: 'FINAL'
} as const;

export type BracketPhase = keyof typeof BRACKET_PHASES;

export function getNextPhase(currentPhase: BracketPhase): BracketPhase | null {
  const phases = Object.keys(BRACKET_PHASES) as BracketPhase[];
  const index = phases.indexOf(currentPhase);
  
  if (index >= 0 && index < phases.length - 1) {
    return phases[index + 1];
  }
  
  return null;
}
