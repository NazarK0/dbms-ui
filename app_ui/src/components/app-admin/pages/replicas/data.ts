/**
 * Configuration data for Replica Clusters (UI-specific)
 */

import { Server, Clock, Zap, Activity } from 'lucide-react';
import type { ReplicationStat } from './types';

export const replicationStats: ReplicationStat[] = [
  { 
    metric: 'Слоти реплікації', 
    value: '3', 
    icon: Server, 
    color: 'from-lime-500 to-green-600' 
  },
  { 
    metric: 'Середня затримка', 
    value: '97мс', 
    icon: Clock, 
    color: 'from-green-500 to-lime-600' 
  },
  { 
    metric: 'Швидкість передачі', 
    value: '12.5 МБ/с', 
    icon: Zap, 
    color: 'from-yellow-500 to-lime-600' 
  },
  { 
    metric: 'Стан синхронізації', 
    value: '99.8%', 
    icon: Activity, 
    color: 'from-lime-600 to-yellow-600' 
  },
];