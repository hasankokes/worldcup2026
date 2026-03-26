export function calculateTipScore(
  predictedHome: number,
  predictedAway: number,
  actualHome: number,
  actualAway: number
): number {
  if (predictedHome === actualHome && predictedAway === actualAway) {
    return 7; // Exact score
  }

  const predictedDiff = predictedHome - predictedAway;
  const actualDiff = actualHome - actualAway;

  const predictedResult = predictedDiff > 0 ? 'HOME' : predictedDiff < 0 ? 'AWAY' : 'DRAW';
  const actualResult = actualDiff > 0 ? 'HOME' : actualDiff < 0 ? 'AWAY' : 'DRAW';

  if (predictedResult === actualResult) {
    if (actualResult === 'DRAW') {
      return 4; // Correct draw prediction (not exact score)
    }
    return 3; // Correct winner prediction
  }

  return 0; // Wrong prediction
}
