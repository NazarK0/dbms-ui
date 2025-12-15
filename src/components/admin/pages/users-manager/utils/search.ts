/**
 * Search Utilities
 * 
 * Advanced user search with scoring and field matching.
 * 
 * @module utils/search
 */

import type { User, UserSearchResult } from '../types';

/**
 * Search users with scoring
 * 
 * Searches users across multiple fields with relevance scoring.
 * Results are sorted by score (most relevant first).
 * 
 * **Scoring System:**
 * - Name (starts with): 10 points
 * - Name (contains): 5 points
 * - Email (starts with): 8 points
 * - Email (contains): 4 points
 * - Role (contains): 3 points
 * - Timezone (contains): 1 point
 * 
 * @param users - Array of users to search
 * @param query - Search query string
 * @returns Search results with matched fields and scores
 * 
 * @example
 * ```tsx
 * const results = searchUsers(users, 'john');
 * // [
 * //   {
 * //     user: { name: 'John Doe', email: 'john@example.com', ... },
 * //     matchFields: ['name', 'email'],
 * //     score: 18  // 10 (name starts) + 8 (email starts)
 * //   },
 * //   {
 * //     user: { name: 'Alice Johnson', email: 'alice@example.com', ... },
 * //     matchFields: ['name'],
 * //     score: 5  // 5 (name contains)
 * //   },
 * //   ...
 * // ]
 * 
 * // Display results
 * results.forEach(({ user, matchFields, score }) => {
 *   console.log(`${user.name} (score: ${score}, matched: ${matchFields.join(', ')})`);
 * });
 * 
 * // Get only users (without scores)
 * const matchedUsers = results.map(r => r.user);
 * ```
 */
export const searchUsers = (
  users: User[],
  query: string
): UserSearchResult[] => {
  if (!query || query.trim().length < 2) {
    return users.map((user) => ({
      user,
      matchFields: [],
      score: 0,
    }));
  }

  const lowerQuery = query.toLowerCase().trim();
  const results: UserSearchResult[] = [];

  users.forEach((user) => {
    const matchFields: string[] = [];
    let score = 0;

    // Check name (highest priority)
    if (user.name.toLowerCase().includes(lowerQuery)) {
      matchFields.push('name');
      score += user.name.toLowerCase().startsWith(lowerQuery) ? 10 : 5;
    }

    // Check email
    if (user.email.toLowerCase().includes(lowerQuery)) {
      matchFields.push('email');
      score += user.email.toLowerCase().startsWith(lowerQuery) ? 8 : 4;
    }

    // Check role
    if (user.role.toLowerCase().includes(lowerQuery)) {
      matchFields.push('role');
      score += 3;
    }

    // Check timezone
    if (user.timezone.toLowerCase().includes(lowerQuery)) {
      matchFields.push('timezone');
      score += 1;
    }

    if (matchFields.length > 0) {
      results.push({ user, matchFields, score });
    }
  });

  // Sort by score (descending)
  return results.sort((a, b) => b.score - a.score);
};
