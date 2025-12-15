/**
 * Database Encodings
 * 
 * Mock data for database character encodings.
 * In production: SELECT pg_encoding_to_char(encoding) FROM pg_database_encodings
 */

import type { DatabaseEncoding } from './types';

export const databaseEncodings: DatabaseEncoding[] = [
  {
    value: 'UTF8',
    label: 'UTF8',
    description: 'Unicode (UTF-8) - рекомендовано для більшості випадків',
    recommended: true,
  },
  {
    value: 'SQL_ASCII',
    label: 'SQL_ASCII',
    description: '7-bit ASCII - застаріле кодування',
  },
  {
    value: 'LATIN1',
    label: 'LATIN1 (ISO-8859-1)',
    description: 'Західноєвропейське кодування',
  },
  {
    value: 'LATIN2',
    label: 'LATIN2 (ISO-8859-2)',
    description: 'Центральноєвропейське кодування',
  },
  {
    value: 'WIN1251',
    label: 'WIN1251',
    description: 'Windows Cyrillic кодування',
  },
  {
    value: 'KOI8R',
    label: 'KOI8R',
    description: 'Російське кодування',
  },
  {
    value: 'WIN1252',
    label: 'WIN1252',
    description: 'Windows Western European',
  },
];
