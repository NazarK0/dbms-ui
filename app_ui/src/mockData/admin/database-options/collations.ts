/**
 * Collations and Character Types
 * 
 * Mock data for database collations (sorting rules) and character type classifications.
 * In production: SELECT collname FROM pg_collation WHERE collencoding = pg_char_to_encoding('UTF8')
 */

import type { Collation, CharacterType } from './types';

export const collations: Collation[] = [
  {
    name: 'uk_UA.UTF-8',
    encoding: 'UTF8',
    description: 'Українська локаль',
    language: 'uk',
  },
  {
    name: 'en_US.UTF-8',
    encoding: 'UTF8',
    description: 'Американська англійська',
    language: 'en',
  },
  {
    name: 'ru_RU.UTF-8',
    encoding: 'UTF8',
    description: 'Російська локаль',
    language: 'ru',
  },
  {
    name: 'C',
    encoding: 'UTF8',
    description: 'C локаль (байтове сортування)',
  },
  {
    name: 'POSIX',
    encoding: 'UTF8',
    description: 'POSIX локаль',
  },
  {
    name: 'de_DE.UTF-8',
    encoding: 'UTF8',
    description: 'Німецька локаль',
    language: 'de',
  },
  {
    name: 'fr_FR.UTF-8',
    encoding: 'UTF8',
    description: 'Французька локаль',
    language: 'fr',
  },
  {
    name: 'pl_PL.UTF-8',
    encoding: 'UTF8',
    description: 'Польська локаль',
    language: 'pl',
  },
];

export const characterTypes: CharacterType[] = [
  {
    name: 'uk_UA.UTF-8',
    encoding: 'UTF8',
    description: 'Українська класифікація символів',
  },
  {
    name: 'en_US.UTF-8',
    encoding: 'UTF8',
    description: 'Американська класифікація',
  },
  {
    name: 'C',
    encoding: 'UTF8',
    description: 'C класифікація (ASCII)',
  },
];
