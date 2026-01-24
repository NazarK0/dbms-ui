import { LucideIcon } from "lucide-react";

export interface AuditEntry {
  id: number;
  time: string;
  user: string;
  action: ActionType;
  category: AuditCategory;
  target: string;
  details: string;
  ipAddress: string;
  status: AuditStatus;
}


export interface AuditTypeIcon {
  Icon: LucideIcon;
  className: string;
}


export type AuditStatus = 'success' | 'failed';

export type ActionType =
  | 'create'
  | 'update'
  | 'delete'
  | 'select'
  | 'grant'
  | 'revoke'
  | 'login'
  | 'backup';

export type AuditCategory =
  | 'База даних'
  | 'Таблиця'
  | 'Запит'
  | 'Права доступу'
  | 'Резервна копія'
  | 'Функція'
  | 'Тригер'
  | 'Користувач'
  | 'Автентифікація';


  export interface ActionBadgeConfig {
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    label: string;
    color: string;
  }




