/**
 * Avatar Utilities
 * 
 * Functions for generating user avatars (initials and colors).
 * 
 * @module utils/avatars
 */

/**
 * Get user initials from name
 * 
 * Extracts initials from user's full name.
 * - Single word: first 2 characters
 * - Multiple words: first letter of first two words
 * 
 * @param name - User's full name
 * @returns User initials (uppercase)
 * 
 * @example
 * ```tsx
 * getUserInitials('John Doe');           // "JD"
 * getUserInitials('Alice');              // "AL"
 * getUserInitials('Maria Garcia Lopez'); // "MG"
 * getUserInitials('');                   // "??"
 * getUserInitials('  ');                 // "??"
 * ```
 */
export const getUserInitials = (name: string): string => {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return '??';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();

  return (parts[0][0] + parts[1][0]).toUpperCase();
};

/**
 * Generate avatar color from name
 * 
 * Generates a consistent gradient color for user avatar based on name hash.
 * Same name always produces same color.
 * 
 * @param name - User's name
 * @returns Tailwind gradient class
 * 
 * @example
 * ```tsx
 * getAvatarColor('John Doe');   // e.g., "from-lime-500 to-green-600"
 * getAvatarColor('Jane Smith'); // e.g., "from-violet-500 to-purple-600"
 * 
 * // Use in component
 * const color = getAvatarColor(user.name);
 * <div className={`bg-gradient-to-br ${color}`}>
 *   {getUserInitials(user.name)}
 * </div>
 * ```
 */
export const getAvatarColor = (name: string): string => {
  const gradients = [
    'from-lime-500 to-green-600',
    'from-green-500 to-lime-600',
    'from-yellow-500 to-lime-600',
    'from-lime-600 to-yellow-600',
    'from-blue-500 to-cyan-600',
    'from-violet-500 to-purple-600',
    'from-indigo-500 to-violet-600',
    'from-red-500 to-red-600',
  ];

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};
