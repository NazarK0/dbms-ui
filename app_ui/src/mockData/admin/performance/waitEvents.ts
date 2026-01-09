/**
 * Wait Events
 * 
 * Mock data for database wait event analysis
 */

import type { WaitEvent } from './types';

export const waitEvents: WaitEvent[] = [
  {
    event_type: 'IO',
    event: 'DataFileRead',
    count: 15234,
    total_wait_time: '2.4г',
    avg_wait_time: '12мс',
  },
  {
    event_type: 'Lock',
    event: 'relation',
    count: 234,
    total_wait_time: '45хв',
    avg_wait_time: '115мс',
  },
  {
    event_type: 'IO',
    event: 'WALWrite',
    count: 45678,
    total_wait_time: '1.8г',
    avg_wait_time: '4мс',
  },
];
