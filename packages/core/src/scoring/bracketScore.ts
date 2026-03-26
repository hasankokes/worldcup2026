export function calculateBracketScore(
  predictedPicks: { stage: string; teamId: string }[],
  actualAdvancements: { stage: string; teamId: string }[]
): number {
  let score = 0;

  const multipliers: Record<string, number> = {
    R16: 1,
    QF: 2,
    SF: 4,
    FINAL: 8,
    WINNER: 16,
  };

  predictedPicks.forEach((pick) => {
    const isCorrect = actualAdvancements.some(
      (a) => a.stage === pick.stage && a.teamId === pick.teamId
    );

    if (isCorrect) {
      score += multipliers[pick.stage] || 0;
    }
  });

  return score;
}
