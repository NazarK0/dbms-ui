import { LucideIcon } from "lucide-react";

export interface ActivityLog {
  id: number;
  type: ActivityType;
  category: ActivityCategory;
  title: string;
  details?: string;
  timeAgo: string;
}

export interface ActivityTypeIcon {
  Icon: LucideIcon;
  className: string;
}

export type ActivityType = 'info' | 'success' | 'warning' | 'error' | 'unknown';
export type ActivityCategory =
  | 'db_connection'
  | 'query_execution'
  | 'table_modification'
  | 'user_login'
  | 'unauthorized_access'
  | 'system_error';
