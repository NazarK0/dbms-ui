/**
 * Validation Utilities
 * 
 * Functions for validating user input (email, name, etc.).
 * 
 * @module utils/validators
 */

/**
 * Validate email format
 * 
 * Validates email address using regex pattern.
 * Checks for basic email structure: local@domain.tld
 * 
 * @param email - Email address to validate
 * @returns True if email is valid
 * 
 * @example
 * ```tsx
 * validateEmail('john@example.com');      // true
 * validateEmail('jane.doe@company.co.uk'); // true
 * validateEmail('invalid');               // false
 * validateEmail('missing@domain');        // false
 * validateEmail('@nodomain.com');         // false
 * validateEmail('noDomain@');             // false
 * validateEmail('');                      // false
 * 
 * // Use in form validation
 * const handleSubmit = (email: string) => {
 *   if (!validateEmail(email)) {
 *     setError('Неправильний формат email');
 *     return;
 *   }
 *   // Process email...
 * };
 * ```
 */
export const validateEmail = (email: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

/**
 * Validate user name
 * 
 * Validates user name length (2-100 characters).
 * 
 * @param name - User name to validate
 * @returns True if name is valid
 * 
 * @example
 * ```tsx
 * validateUserName('John Doe');           // true
 * validateUserName('Alice');              // true
 * validateUserName('J');                  // false (too short)
 * validateUserName('A'.repeat(101));      // false (too long)
 * validateUserName('');                   // false (empty)
 * 
 * // Use in form validation
 * const handleSubmit = (name: string) => {
 *   if (!validateUserName(name)) {
 *     setError('Ім\'я має бути від 2 до 100 символів');
 *     return;
 *   }
 *   // Process name...
 * };
 * ```
 */
export const validateUserName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 100;
};
