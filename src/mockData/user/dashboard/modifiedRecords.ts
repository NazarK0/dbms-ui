import type { ModifiedRecord } from './types';

// Last Modified Records - останні змінені записи користувачем
export const lastModifiedRecords: ModifiedRecord[] = [
  {
    id: 1,
    title: 'Інтернет-маркетинг компанія "WebPro"',
    table: 'companies',
    database: 'crm_database',
    action: 'updated',
    timestamp: '5 хвилин тому',
    user: 'Іван Петренко',
  },
  {
    id: 2,
    title: 'Розробка мобільного додатку для e-commerce',
    table: 'projects',
    database: 'project_management',
    action: 'created',
    timestamp: '12 хвилин тому',
    user: 'Марія Коваленко',
  },
  {
    id: 3,
    title: 'Квартальний звіт продажів Q4 2024',
    table: 'reports',
    database: 'analytics_db',
    action: 'updated',
    timestamp: '1 годину тому',
    user: 'Олексій Шевченко',
  },
  {
    id: 4,
    title: 'Контракт з постачальником IT-обладнання',
    table: 'contracts',
    database: 'procurement_db',
    action: 'created',
    timestamp: '2 години тому',
    user: 'Анна Мельник',
  },
  {
    id: 5,
    title: 'Оновлення каталогу продуктів',
    table: 'products',
    database: 'ecommerce_db',
    action: 'updated',
    timestamp: '3 години тому',
    user: 'Дмитро Коваль',
  },
];
