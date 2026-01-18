import { LucideIcon } from "lucide-react";

export interface SystemLog {
  id: number;
  time: string;
  level: LogLevel;
  source: string;
  database: string;
  user: string;
  message: string;
  details?: string;
}

export interface AuditTypeIcon {
  Icon: LucideIcon;
  className: string;
}

export type LogLevel = 'info' | 'success' | 'warning' | 'error' | 'unknown';

