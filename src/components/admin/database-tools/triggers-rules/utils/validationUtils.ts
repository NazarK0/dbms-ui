/**
 * Triggers & Rules - Validation Utility Functions
 * 
 * Functions for validating trigger and rule names, events, and properties.
 */

/**
 * Validate trigger name according to PostgreSQL identifier rules
 * @param name - Trigger name to validate
 * @returns true if valid, false otherwise
 */
export const isValidTriggerName = (name: string): boolean => {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
};

/**
 * Validate rule name according to PostgreSQL identifier rules
 * @param name - Rule name to validate
 * @returns true if valid, false otherwise
 */
export const isValidRuleName = (name: string): boolean => {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
};

/**
 * Check if event type is valid
 * @param event - Event string to validate
 * @returns true if contains valid event type, false otherwise
 */
export const isValidEventType = (event: string): boolean => {
  const validEvents = ['INSERT', 'UPDATE', 'DELETE', 'SELECT'];
  return validEvents.some(valid => event.toUpperCase().includes(valid));
};

/**
 * Validate trigger timing
 * @param timing - Timing value to validate
 * @returns true if valid (BEFORE or AFTER), false otherwise
 */
export const isValidTiming = (timing: string): boolean => {
  return timing === 'BEFORE' || timing === 'AFTER';
};

/**
 * Validate rule type
 * @param type - Rule type to validate
 * @returns true if valid (INSTEAD or ALSO), false otherwise
 */
export const isValidRuleType = (type: string): boolean => {
  return type === 'INSTEAD' || type === 'ALSO';
};
