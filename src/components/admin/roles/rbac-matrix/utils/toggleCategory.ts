/**
 * Toggle category in expanded set
 */
export function toggleCategory(
  category: string,
  expandedCategories: Set<string>
): Set<string> {
  const newExpanded = new Set(expandedCategories);
  if (newExpanded.has(category)) {
    newExpanded.delete(category);
  } else {
    newExpanded.add(category);
  }
  return newExpanded;
}
