export function calculateWeightedTotal(
  fantasyScore: number,
  tipScore: number,
  bracketScore: number
): number {
  return (fantasyScore * 0.40) + (tipScore * 0.35) + (bracketScore * 0.25);
}
