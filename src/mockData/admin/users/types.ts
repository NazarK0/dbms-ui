/**
 * TypeScript types for users management
 */

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  roleColor: string;
  status: 'active' | 'inactive';
  avatar: string;
  lastActive?: string;
  registered?: string;
  timezone: string;
}

export interface Timezone {
  value: string;
  label: string;
  title: string;
}
