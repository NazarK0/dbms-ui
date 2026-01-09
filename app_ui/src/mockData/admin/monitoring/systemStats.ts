/**
 * System Statistics
 * 
 * Mock data for system resource monitoring (CPU, Memory, Connections, Disk)
 */

import { Cpu, HardDrive, Activity, Server } from 'lucide-react';
import type { SystemStat } from './types';

export const systemStats: SystemStat[] = [
  { label: 'Використання CPU', value: '34%', percentage: 34, icon: Cpu, color: 'from-lime-500 to-green-600' },
  { label: 'Використання пам\'яті', value: '2.1 ГБ / 8 ГБ', percentage: 26, icon: HardDrive, color: 'from-green-500 to-lime-600' },
  { label: 'Активні з\'єднання', value: '45 / 200', percentage: 23, icon: Activity, color: 'from-yellow-500 to-lime-600' },
  { label: 'Використання диску', value: '125 ГБ / 500 ГБ', percentage: 25, icon: Server, color: 'from-lime-600 to-yellow-600' },
];
