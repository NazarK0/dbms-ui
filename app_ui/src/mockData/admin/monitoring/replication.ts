/**
 * Replication Monitoring
 * 
 * Mock data for replication statistics and activity
 */

import { Server, Clock, Zap, Activity } from 'lucide-react';
import type { ReplicationStat, ReplicationActivity } from './types';

export const replicationStats: ReplicationStat[] = [
  { metric: 'Слоти реплікації', value: '3', icon: Server, color: 'from-lime-500 to-green-600' },
  { metric: 'Середня затримка', value: '97мс', icon: Clock, color: 'from-green-500 to-lime-600' },
  { metric: 'Швидкість передачі', value: '12.5 МБ/с', icon: Zap, color: 'from-yellow-500 to-lime-600' },
  { metric: 'Стан синхронізації', value: '99.8%', icon: Activity, color: 'from-lime-600 to-yellow-600' },
];

export const replicationActivity: ReplicationActivity[] = [
  {
    replica: 'Read Replica 1',
    database: 'production_db',
    lag: '45ms',
    status: 'Синхронізовано',
    lastSync: '2 сек тому',
  },
  {
    replica: 'Read Replica 2',
    database: 'production_db',
    lag: '123ms',
    status: 'Синхронізовано',
    lastSync: '5 сек тому',
  },
  {
    replica: 'Standby Replica',
    database: 'production_db',
    lag: '0ms',
    status: 'Синхронний',
    lastSync: 'Real-time',
  },
];
