/**
 * Table Statistics
 * 
 * Mock data for table-level statistics including size, scans, and maintenance info
 */

import type { TableStat } from './types';

export const tableStatistics: TableStat[] = [
  {
    name: 'orders',
    rows: '1.2M',
    size: '450 МБ',
    index_size: '123 МБ',
    seq_scans: 45,
    idx_scans: 15234,
    dead_tuples: 1234,
    last_vacuum: '2 год тому',
    last_analyze: '1 год тому',
  },
  {
    name: 'users',
    rows: '45K',
    size: '12 МБ',
    index_size: '8 МБ',
    seq_scans: 123,
    idx_scans: 23456,
    dead_tuples: 234,
    last_vacuum: '30 хв тому',
    last_analyze: '15 хв тому',
  },
  {
    name: 'products',
    rows: '234K',
    size: '89 МБ',
    index_size: '34 МБ',
    seq_scans: 234,
    idx_scans: 12456,
    dead_tuples: 567,
    last_vacuum: '1 год тому',
    last_analyze: '45 хв тому',
  },
  {
    name: 'audit_logs',
    rows: '5.6M',
    size: '1.2 ГБ',
    index_size: '234 МБ',
    seq_scans: 12,
    idx_scans: 234,
    dead_tuples: 45678,
    last_vacuum: '12 год тому',
    last_analyze: '6 год тому',
  },
];
