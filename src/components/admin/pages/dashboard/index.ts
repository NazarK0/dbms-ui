// Central exports for Dashboard components
export { default as DashboardHeader } from './DashboardHeader';
export { default as CustomizeDialog } from './customize/CustomizeDialog';
export { default as StatsGrid } from './StatsGrid';
export { default as PerformanceOverview } from './PerformanceOverview';
export { default as RecentActivityCard } from './RecentActivityCard';
export { default as ActiveConnectionsCard } from './ActiveConnectionsCard';
export * from './types';
export * from './utils'; // Now imports from utils/index.ts
export * from './data';