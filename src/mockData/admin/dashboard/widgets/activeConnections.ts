const activeConnections = {
  header: [
    {
      key: "type",
      header: "Активність",
    },
  ],

  data: [
    {
      database: 'production_db',
      user: 'app_user',
      state: 'активний',
      duration: '00:45:32',
      queries: 1234,
    },
    { database: 'analytics_db', user: 'analyst', state: 'очікує', duration: '01:23:45', queries: 45 },
    {
      database: 'staging_db',
      user: 'developer',
      state: 'активний',
      duration: '00:12:18',
      queries: 678,
    },
    {
      database: 'production_db',
      user: 'api_service',
      state: 'активний',
      duration: '05:34:21',
      queries: 8921,
    },
  ]
};

export default activeConnections;