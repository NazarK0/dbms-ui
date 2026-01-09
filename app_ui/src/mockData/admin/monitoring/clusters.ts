/**
 * Replica Clusters
 * 
 * Mock data for replica cluster management and monitoring
 */

import type { ReplicaCluster } from './types';

export const clusters: ReplicaCluster[] = [
  {
    id: 1,
    name: 'Production Cluster',
    primary: {
      host: 'primary-db-01.example.com',
      port: 5432,
      status: 'Активний',
    },
    replicas: [
      {
        id: 1,
        name: 'Read Replica 1',
        host: 'replica-01.example.com',
        port: 5432,
        type: 'Асинхронна',
        lag: '45ms',
        status: 'Синхронізовано',
      },
      {
        id: 2,
        name: 'Read Replica 2',
        host: 'replica-02.example.com',
        port: 5432,
        type: 'Асинхронна',
        lag: '123ms',
        status: 'Синхронізовано',
      },
      {
        id: 3,
        name: 'Standby Replica',
        host: 'standby-01.example.com',
        port: 5432,
        type: 'Синхронна',
        lag: '0ms',
        status: 'Синхронний',
      },
    ],
    stats: {
      totalSize: '3.8 ТБ',
      totalConnections: 245,
      avgReplicationLag: '56ms',
    },
  },
  {
    id: 2,
    name: 'Analytics Cluster',
    primary: {
      host: 'analytics-primary.example.com',
      port: 5432,
      status: 'Активний',
    },
    replicas: [
      {
        id: 4,
        name: 'Analytics Replica',
        host: 'analytics-replica-01.example.com',
        port: 5432,
        type: 'Асинхронна',
        lag: '234ms',
        status: 'Синхронізовано',
      },
    ],
    stats: {
      totalSize: '1.2 ТБ',
      totalConnections: 87,
      avgReplicationLag: '234ms',
    },
  },
];
