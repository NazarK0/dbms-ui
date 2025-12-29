/**
 * Generates a random integer between min and max, inclusive.
 * @param max The minimum value (inclusive).
 * @param min The maximum value (inclusive)(default: 0).
 * @returns A random integer.
 */
export function getRandomInt(max: number, min: number=0): number {
  // Use Math.ceil() on min and Math.floor() on max to handle potential non-integer inputs correctly for the inclusive range logic.
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
}
