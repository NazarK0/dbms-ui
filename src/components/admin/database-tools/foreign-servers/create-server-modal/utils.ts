/**
 * Create Foreign Server Modal - Utility Functions
 * 
 * Helper functions for form validation and state management.
 */

import { ServerFormData } from './types';

/**
 * Validates if the form data is complete and valid for submission
 * @param data - Server form data to validate
 * @returns true if valid, false otherwise
 */
export const validateServerForm = (data: ServerFormData): boolean => {
  return Boolean(data.serverName.trim() && data.host.trim());
};

/**
 * Sanitizes form data before submission
 * Trims whitespace and removes optional fields if empty
 * @param data - Raw form data
 * @returns Sanitized form data
 */
export const sanitizeFormData = (data: ServerFormData): ServerFormData => {
  return {
    serverName: data.serverName.trim(),
    wrapperType: data.wrapperType,
    host: data.host.trim(),
    port: data.port,
    dbname: data.dbname.trim(),
    username: data.username?.trim() || undefined,
  };
};

/**
 * Generates a unique server name suggestion based on wrapper type
 * @param wrapperType - The FDW wrapper type
 * @returns Suggested server name
 */
export const generateServerNameSuggestion = (wrapperType: string): string => {
  const prefix = wrapperType.replace('_fdw', '');
  const timestamp = Date.now().toString(36).slice(-4);
  return `${prefix}_server_${timestamp}`;
};

/**
 * Checks if a server name is valid according to PostgreSQL naming rules
 * @param name - Server name to validate
 * @returns Validation result with optional error message
 */
export const validateServerName = (name: string): { valid: boolean; error?: string } => {
  if (!name.trim()) {
    return { valid: false, error: 'Назва сервера не може бути порожньою' };
  }

  if (name.length > 63) {
    return { valid: false, error: 'Назва сервера не може перевищувати 63 символи' };
  }

  // PostgreSQL identifier rules: start with letter or underscore, contain only letters, digits, underscores
  const validPattern = /^[a-z_][a-z0-9_]*$/i;
  if (!validPattern.test(name)) {
    return { 
      valid: false, 
      error: 'Назва сервера може містити тільки літери, цифри та підкреслення, і повинна починатися з літери або підкреслення' 
    };
  }

  return { valid: true };
};

/**
 * Checks if a host string is valid (basic validation)
 * @param host - Host string to validate
 * @returns Validation result
 */
export const validateHost = (host: string): { valid: boolean; error?: string } => {
  if (!host.trim()) {
    return { valid: false, error: 'Хост не може бути порожнім' };
  }

  // Basic hostname/IP validation
  const hostnamePattern = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;

  if (!hostnamePattern.test(host) && !ipPattern.test(host)) {
    return { valid: false, error: 'Невалідний формат хоста' };
  }

  return { valid: true };
};

/**
 * Validates port number
 * @param port - Port string to validate
 * @returns Validation result
 */
export const validatePort = (port: string): { valid: boolean; error?: string } => {
  const portNum = parseInt(port, 10);
  
  if (isNaN(portNum)) {
    return { valid: false, error: 'Порт має бути числом' };
  }

  if (portNum < 1 || portNum > 65535) {
    return { valid: false, error: 'Порт має бути в діапазоні 1-65535' };
  }

  return { valid: true };
};
