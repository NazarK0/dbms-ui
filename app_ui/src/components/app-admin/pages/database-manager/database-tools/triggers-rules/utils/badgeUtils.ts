/**
 * Triggers & Rules - Badge Utility Functions
 * 
 * Functions for determining badge colors and styles based on 
 * trigger/rule properties (events, timing, types).
 */

/**
 * Get badge color classes for trigger event types
 * @param event - Trigger event (INSERT, UPDATE, DELETE, SELECT)
 * @returns Tailwind CSS classes for badge styling
 */
export const getEventBadgeColor = (event: string): string => {
  if (event.includes('INSERT')) {
    return 'bg-green-50 text-green-700 border-green-200';
  } else if (event.includes('UPDATE')) {
    return 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (event.includes('DELETE')) {
    return 'bg-red-50 text-red-700 border-red-200';
  } else if (event.includes('SELECT')) {
    return 'bg-purple-50 text-purple-700 border-purple-200';
  }
  return 'bg-gray-50 text-gray-700 border-gray-200';
};

/**
 * Get badge color classes for rule types
 * @param type - Rule type (INSTEAD, ALSO)
 * @returns Tailwind CSS classes for badge styling
 */
export const getRuleTypeBadgeColor = (type: string): string => {
  if (type === 'INSTEAD') {
    return 'bg-orange-50 text-orange-700 border-orange-200';
  } else if (type === 'ALSO') {
    return 'bg-teal-50 text-teal-700 border-teal-200';
  }
  return 'bg-gray-50 text-gray-700 border-gray-200';
};

/**
 * Get badge color classes for trigger timing
 * @param timing - Trigger timing (BEFORE, AFTER)
 * @returns Tailwind CSS classes for badge styling
 */
export const getTimingBadgeColor = (timing: string): string => {
  if (timing === 'BEFORE') {
    return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  } else if (timing === 'AFTER') {
    return 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }
  return 'bg-gray-50 text-gray-700 border-gray-200';
};
