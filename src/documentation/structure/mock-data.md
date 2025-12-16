# 📊 Mock Data - Тестові дані

**Загальна кількість файлів:** ~140 файлів

## Структура

```
📁 mockData/
├── 📄 index.ts (19 рядків)
│
├── 📁 admin/                                # Admin mock data - 90+ файлів
└── 📁 user/                                 # User mock data - 38 файлів
```

## Admin Mock Data (90+ файлів)

### Основні файли

```
📁 mockData/admin/
├── 📄 backups.ts (187 рядків)
├── 📄 cli.ts (188 рядків)
├── 📄 dashboard.ts (101 рядок)
├── 📄 dataTypes.ts (349 рядків)
├── 📄 extensions.ts (231 рядок)
├── 📄 foreignServers.ts (113 рядків)
├── 📄 functions.ts (373 рядки)
├── 📄 logs.ts (85 рядків)
├── 📄 navigation.ts (54 рядки)
├── 📄 queries.ts (59 рядків)
├── 📄 queryExecutor.ts (126 рядків)
├── 📄 replicas.ts (114 рядків)
├── 📄 roles.ts (191 рядок)
├── 📄 schemaOwners.ts (20 рядків)
├── 📄 schemaVisualizer.ts (325 рядків)
├── 📄 schemas.ts (296 рядків)
├── 📄 tableBrowser.ts (104 рядки)
├── 📄 tables.ts (121 рядок)
├── 📄 triggers.ts (275 рядків)
└── 📄 index.ts (28 рядків)
```

### Підкатегорії

#### 1. Audit Log (5 файлів)
```
📁 auditLog/
├── 📄 auditEntries.ts (362 рядки)
├── 📄 filters.ts (25 рядків)
├── 📄 types.ts (53 рядки)
└── 📄 index.ts (4 рядки)
```

#### 2. Database Options (9 файлів)
```
📁 database-options/
├── 📄 collations.ts (25 рядків)
├── 📄 connectionLimits.ts (11 рядків)
├── 📄 defaults.ts (14 рядків)
├── 📄 encodings.ts (25 рядків)
├── 📄 owners.ts (29 рядків)
├── 📄 tablespaces.ts (49 рядків)
├── 📄 templates.ts (28 рядків)
├── 📄 types.ts (17 рядків)
└── 📄 index.ts (10 рядків)
```

#### 3. Databases (6 файлів)
```
📁 databases/
├── 📄 adminDatabases.ts (152 рядки)
├── 📄 templateDatabases.ts (101 рядок)
├── 📄 userDatabases.ts (292 рядки)
├── 📄 types.ts (52 рядки)
└── 📄 index.ts (5 рядків)
```

#### 4. Monitoring (8 файлів)
```
📁 monitoring/
├── 📄 clusters.ts (121 рядок)
├── 📄 connections.ts (103 рядки)
├── 📄 databaseStats.ts (92 рядки)
├── 📄 queries.ts (87 рядків)
├── 📄 replication.ts (89 рядків)
├── 📄 systemStats.ts (81 рядок)
├── 📄 types.ts (74 рядки)
└── 📄 index.ts (8 рядків)
```

#### 5. Performance (10 файлів)
```
📁 performance/
├── 📄 cacheStats.ts (54 рядки)
├── 📄 indexUsage.ts (87 рядків)
├── 📄 locks.ts (92 рядки)
├── 📄 queryStats.ts (82 рядки)
├── 📄 slowQueries.ts (79 рядків)
├── 📄 tableStats.ts (88 рядків)
├── 📄 waitEvents.ts (95 рядків)
├── 📄 types.ts (97 рядків)
└── 📄 index.ts (10 рядків)
```

#### 6. Permissions (9 файлів)
```
📁 permissions/
├── 📄 adminPermissions.ts (58 рядків)
├── 📄 adminRoles.ts (153 рядки)
├── 📄 permissionCategories.ts (195 рядків)
├── 📄 roleOptions.ts (43 рядки)
├── 📄 uiMenuItems.ts (71 рядок)
├── 📄 userPermissions.ts (65 рядків)
├── 📄 userRoles.ts (159 рядків)
├── 📄 types.ts (95 рядків)
└── 📄 index.ts (9 рядків)
```

#### 7. PostgreSQL Config (10 файлів)
```
📁 postgresConfig/
├── 📄 autovacuumParams.ts (159 рядків)
├── 📄 connectionParams.ts (85 рядків)
├── 📄 loggingParams.ts (134 рядки)
├── 📄 memoryParams.ts (123 рядки)
├── 📄 performanceParams.ts (145 рядків)
├── 📄 presets.ts (112 рядків)
├── 📄 profiles.ts (87 рядків)
├── 📄 walParams.ts (117 рядків)
├── 📄 types.ts (63 рядки)
└── 📄 index.ts (11 рядків)
```

#### 8. Users (6 файлів)
```
📁 users/
├── 📄 administrators.ts (134 рядки)
├── 📄 endUsers.ts (298 рядків)
├── 📄 timezones.ts (69 рядків)
├── 📄 types.ts (30 рядків)
└── 📄 index.ts (5 рядків)
```

## User Mock Data (38 файлів)

### Основні файли

```
📁 mockData/user/
├── 📄 records.ts (83 рядки)
├── 📄 userRoles.ts (101 рядок)
└── 📄 index.ts (5 рядків)
```

### Підкатегорії

#### 1. Dashboard (9 файлів)
```
📁 dashboard/
├── 📄 accessedTables.ts (70 рядків)
├── 📄 activityRecords.ts (90 рядків)
├── 📄 dashboardDatabases.ts (97 рядків)
├── 📄 databasesWithTables.ts (211 рядків)
├── 📄 modifiedRecords.ts (86 рядків)
├── 📄 myDatabases.ts (89 рядків)
├── 📄 types.ts (48 рядків)
└── 📄 index.ts (8 рядків)
```

- Змінені записи

#### 2. Databases (9 файлів)
```
📁 databases/
├── 📄 analyticsDatabase.ts (93 рядки)
├── 📄 contentDatabase.ts (91 рядок)
├── 📄 crmDatabase.ts (96 рядків)
├── 📄 ecommerceDatabase.ts (108 рядків)
├── 📄 projectManagementDatabase.ts (91 рядок)
├── 📄 reportsDatabase.ts (87 рядків)
├── 📄 types.ts (24 рядки)
└── 📄 index.ts (9 рядків)
```

#### 3. Profile (8 файлів)
```
📁 profile/
├── 📄 activityStats.ts (36 рядків)
├── 📄 databaseAccess.ts (57 рядків)
├── 📄 groupedDatabases.ts (62 рядки)
├── 📄 recentActivity.ts (72 рядки)
├── 📄 userInfo.ts (49 рядків)
├── 📄 types.ts (34 рядки)
└── 📄 index.ts (7 рядків)
```

#### 4. Table Schemas (10 файлів)
```
📁 tableschemas/
├── 📄 analytics.ts (181 рядок)
├── 📄 content.ts (153 рядки)
├── 📄 crm.ts (297 рядків)
├── 📄 ecommerce.ts (271 рядок)
├── 📄 projects.ts (197 рядків)
├── 📄 reports.ts (137 рядків)
├── 📄 system.ts (94 рядки)
├── 📄 types.ts (19 рядків)
└── 📄 index.ts (11 рядків)
```