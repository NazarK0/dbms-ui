/**
 * Saved Queries - Utility Functions
 * ==================================
 * 
 * Допоміжні функції для фільтрації та обробки збережених запитів.
 */

import { SavedQuery } from '../types';

/**
 * Отримати масив унікальних тегів з усіх запитів
 */
export function extractUniqueTags(queries: SavedQuery[]): string[] {
  const allTags = queries.flatMap((q) => q.tags || []);
  const uniqueTags = Array.from(new Set(allTags));
  return uniqueTags.sort();
}

/**
 * Фільтрувати запити за пошуковим терміном та тегом
 */
export function filterQueries(
  queries: SavedQuery[],
  searchTerm: string,
  selectedTag: string | null
): SavedQuery[] {
  return queries.filter((query) => {
    // Перевірка пошуку
    const matchesSearch =
      !searchTerm ||
      query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Перевірка тегу
    const matchesTag = !selectedTag || query.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });
}
