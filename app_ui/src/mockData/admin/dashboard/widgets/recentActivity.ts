const recentActivity = [
  {
    action: 'База даних створена',
    details: 'production_db',
    user: 'admin',
    time: '2 хвилини тому',
    type: 'success' as const,
  },
  {
    action: 'Користувач створений',
    details: 'developer_user',
    user: 'root',
    time: '15 хвилин тому',
    type: 'info' as const,
  },
  {
    action: 'Таблицю змінено',
    details: 'users.customers',
    user: 'admin',
    time: '1 годину тому',
    type: 'warning' as const,
  },
  {
    action: 'Резервне копіювання завершено',
    details: 'staging_db',
    user: 'system',
    time: '2 години тому',
    type: 'success' as const,
  },
  {
    action: 'Запит виконано',
    details: 'SELECT * FROM orders',
    user: 'analyst',
    time: '3 години тому',
    type: 'info' as const,
  },
];

export default recentActivity;