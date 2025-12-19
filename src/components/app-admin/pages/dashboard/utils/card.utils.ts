/**
 * Card Utility Functions
 * 
 * Manages dashboard card operations including filtering, visibility,
 * searching, and grouping.
 * 
 * @module card.utils
 */

import type { DashboardCard } from '../types';

/**
 * Filter cards by visibility
 * 
 * Returns only cards that are currently visible on the dashboard.
 * 
 * @param cards - Array of dashboard cards
 * @returns Array of visible cards
 * 
 * @example
 * ```ts
 * const visible = getVisibleCards(allCards);
 * ```
 */
export const getVisibleCards = (cards: DashboardCard[]): DashboardCard[] => {
  return cards.filter((card) => card.visible);
};

/**
 * Filter cards by category
 * 
 * Returns all cards belonging to a specific category.
 * 
 * @param cards - Array of dashboard cards
 * @param category - Category to filter by
 * @returns Array of cards in the category
 * 
 * @example
 * ```ts
 * const statsCards = getCardsByCategory(allCards, 'stats');
 * ```
 */
export const getCardsByCategory = (
  cards: DashboardCard[],
  category: string
): DashboardCard[] => {
  return cards.filter((card) => card.category === category);
};

/**
 * Count visible cards
 * 
 * Returns the total number of visible cards.
 * 
 * @param cards - Array of dashboard cards
 * @returns Number of visible cards
 * 
 * @example
 * ```ts
 * const count = countVisibleCards(allCards); // 8
 * ```
 */
export const countVisibleCards = (cards: DashboardCard[]): number => {
  return cards.filter((card) => card.visible).length;
};

/**
 * Check if card is visible
 * 
 * Checks if a specific card is currently visible.
 * Returns true if card not found (default behavior).
 * 
 * @param cards - Array of dashboard cards
 * @param cardId - ID of the card to check
 * @returns True if card is visible, false otherwise
 * 
 * @example
 * ```ts
 * if (isCardVisible(cards, 'database-count')) {
 *   renderCard();
 * }
 * ```
 */
export const isCardVisible = (
  cards: DashboardCard[],
  cardId: string
): boolean => {
  const card = cards.find((c) => c.id === cardId);
  return card?.visible ?? true;
};

/**
 * Toggle card visibility
 * 
 * Toggles the visibility state of a specific card.
 * Returns a new array with the updated card.
 * 
 * @param cards - Array of dashboard cards
 * @param cardId - ID of the card to toggle
 * @returns New array with updated card visibility
 * 
 * @example
 * ```ts
 * const updated = toggleCardVisibility(cards, 'database-count');
 * setCards(updated);
 * ```
 */
export const toggleCardVisibility = (
  cards: DashboardCard[],
  cardId: string
): DashboardCard[] => {
  return cards.map((card) =>
    card.id === cardId ? { ...card, visible: !card.visible } : card
  );
};

/**
 * Search cards by name or description
 * 
 * Searches cards by matching name or description (case-insensitive).
 * 
 * @param cards - Array of dashboard cards
 * @param searchTerm - Search query
 * @returns Filtered array of matching cards
 * 
 * @example
 * ```ts
 * const results = searchCards(cards, 'база даних');
 * ```
 */
export const searchCards = (
  cards: DashboardCard[],
  searchTerm: string
): DashboardCard[] => {
  const term = searchTerm.toLowerCase();
  return cards.filter(
    (card) =>
      card.name.toLowerCase().includes(term) ||
      card.description.toLowerCase().includes(term)
  );
};

/**
 * Group cards by category
 * 
 * Groups cards into an object keyed by category.
 * 
 * @param cards - Array of dashboard cards
 * @returns Object with categories as keys and card arrays as values
 * 
 * @example
 * ```ts
 * const grouped = groupCardsByCategory(cards);
 * // { stats: [...], performance: [...], activity: [...] }
 * ```
 */
export const groupCardsByCategory = (
  cards: DashboardCard[]
): Record<string, DashboardCard[]> => {
  return cards.reduce((acc, card) => {
    if (!acc[card.category]) {
      acc[card.category] = [];
    }
    acc[card.category].push(card);
    return acc;
  }, {} as Record<string, DashboardCard[]>);
};
