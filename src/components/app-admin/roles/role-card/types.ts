/**
 * TypeScript types for RoleCard component
 */

export type RoleType = 'admin' | 'user';

export interface Role {
  name: string;
  users: number;
  description: string;
  color: string; // Tailwind gradient classes
  badge: 'destructive' | 'default' | 'secondary' | 'outline';
  type: RoleType;
}

export interface RoleCardProps {
  role: Role;
  onEdit: (role: Role) => void;
  onSelect: (name: string) => void;
  onDelete?: (role: Role) => void;
}
