# PostgreSQL DBMS - Корпоративна Система Управління Базами Даних

**Повнофункціональна система управління PostgreSQL з RBAC, Row Level Security та українською локалізацією**

---

## 📋 Зміст

- [Огляд системи](#-огляд-системи)
- [Технологічний стек](#-технологічний-стек)
- [Структура проекту](#-структура-проекту)
- [Теми та стилізація](#-теми-та-стилізація)
- [Потенційні доповнення](#-потенційні-доповнення)

---

## 🎯 Огляд системи

PostgreSQL DBMS - це корпоративна система управління базами даних на основі PostgreSQL з повним функціоналом для суперадміністратора та користувачів з різними ролями. Система забезпечує:

- **Адміністративна панель** (Olive/Lime тема) - повний контроль над PostgreSQL
- **Користувацький інтерфейс** (Violet/Purple тема) - доступ до даних згідно з правами
- **RBAC Matrix** - гранулярне управління правами доступу
- **Row Level Security** - безпека на рівні рядків таблиць
- **Microsoft Active Directory** - автоматична синхронізація користувачів
- **Адаптивний дизайн** - з блокуванням мобільних пристроїв для критичних функцій

### Ключові особливості
✅ **Українська локалізація** - повністю українською мовою  
✅ **Безпека** - RBAC + RLS + AD інтеграція  
✅ **Модульність** - глибока декомпозиція компонентів  
✅ **TypeScript** - 100% типізація  
✅ **shadcn/ui** - сучасні UI компоненти  
✅ **Корпоративний** - без платежів, тільки управління ролями  

---

## 🛠 Технологічний стек

### Frontend
- **React 18** - UI фреймворк
- **TypeScript** - статична типізація
- **Tailwind CSS v4** - utility-first CSS
- **shadcn/ui** - компонентна бібліотека
- **lucide-react** - іконки
- **recharts** - графіки та візуалізація

### Backend готовність
- **PostgreSQL** - РСУБД (ready for integration)
- **Microsoft Active Directory** - автентифікація користувачів
- **Row Level Security** - політики безпеки на рівні БД

### Інструменти
- **Vite** - build tool
- **ESLint** - linting
- **Prettier** - code formatting

---

## 📁 Структура проекту

```
/
├── App.tsx                              # Головний компонент додатку
├── README.md                            # Ця документація
│
├── components/                          # Всі React компоненти
│   ├── admin/                          # Адміністративна панель (Olive тема)
│   │   ├── AdminHeader.tsx             # Заголовок адмін панелі
│   │   ├── AdminTabsList.tsx           # Навігація по табах
│   │   ├── Logs.tsx                    # Системні логи
│   │   │
│   │   ├── dashboard/                  # Компоненти Dashboard
│   │   │   ├── ActivityItem.tsx
│   │   │   ├── ConnectionItem.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── database-manager/           # Управління БД
│   │   │   ├── AdminDatabasesCard.tsx
│   │   │   ├── CreateDatabaseModal.tsx
│   │   │   ├── CopyDatabaseModal.tsx
│   │   │   ├── ExportDatabaseModal.tsx
│   │   │   ├── ImportDatabaseModal.tsx
│   │   │   ├── DatabaseListView.tsx
│   │   │   ├── DatabaseToolsView.tsx
│   │   │   ├── DatabaseManagerHeader.tsx
│   │   │   ├── SelectedDatabaseAlert.tsx
│   │   │   ├── TemplateDatabasesCard.tsx
│   │   │   ├── UserDatabasesTable.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── database-tools/             # Інструменти роботи з БД
│   │   │   ├── BackupRestore.tsx       # Резервні копії
│   │   │   ├── DataTypesManager.tsx    # Типи даних
│   │   │   ├── ExtensionManager.tsx    # Розширення
│   │   │   ├── ForeignServersManager.tsx # Foreign Data Wrappers
│   │   │   ├── ForeignTablesManager.tsx  # Зовнішні таблиці
│   │   │   ├── FunctionsManager.tsx    # Функції та процедури
│   │   │   ├── QueryExecutor.tsx       # SQL редактор
│   │   │   ├── SchemaVisualizer.tsx    # Візуалізація схем
│   │   │   ├── SchemasManager.tsx      # Управління схемами
│   │   │   ├── TableBrowser.tsx        # Браузер таблиць
│   │   │   ├── TriggersRules.tsx       # Тригери та правила
│   │   │   │
│   │   │   ├── backup-restore/         # Модуль Backup (11 файлів)
│   │   │   │   ├── BackupActions.tsx
│   │   │   │   ├── BackupHeader.tsx
│   │   │   │   ├── BackupProgress.tsx
│   │   │   │   ├── BackupsTable.tsx
│   │   │   │   ├── RestoreUpload.tsx
│   │   │   │   ├── RestoreWarning.tsx
│   │   │   │   ├── ScheduleActions.tsx
│   │   │   │   ├── ScheduleHeader.tsx
│   │   │   │   ├── SchedulesTable.tsx
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── data-types/             # Модуль Data Types (10 файлів)
│   │   │   │   ├── CompositeTypesTable.tsx
│   │   │   │   ├── CreateTypeModal.tsx
│   │   │   │   ├── DomainTypesTable.tsx
│   │   │   │   ├── EnumTypesTable.tsx
│   │   │   │   ├── TypeActions.tsx
│   │   │   │   ├── TypesHeader.tsx
│   │   │   │   ├── TypesInfoAlert.tsx
│   │   │   │   ├── TypesSearchBar.tsx
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── foreign-servers/        # Модуль Foreign Servers (9 файлів)
│   │   │   │   ├── CreateServerModal.tsx
│   │   │   │   ├── FDWNotInstalledAlert.tsx
│   │   │   │   ├── ServerActions.tsx
│   │   │   │   ├── ServersHeader.tsx
│   │   │   │   ├── ServersInfoAlert.tsx
│   │   │   │   ├── ServersSearchBar.tsx
│   │   │   │   ├── ServersTable.tsx
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── foreign-tables/         # Модуль Foreign Tables (9 файлів)
│   │   │   │   ├── CreateTableModal.tsx
│   │   │   │   ├── ForeignTablesTable.tsx
│   │   │   │   ├── TableActions.tsx
│   │   │   │   ├── TablesHeader.tsx
│   │   │   │   ├── TablesInfoAlert.tsx
│   │   │   │   ├── TablesSearchBar.tsx
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── schemas/                # Модуль Schemas (10 файлів)
│   │   │   │   ├── CreateSchemaModal.tsx
│   │   │   │   ├── SchemaActions.tsx
│   │   │   │   ├── SchemaTabNavigation.tsx
│   │   │   │   ├── SchemaTabsContent.tsx
│   │   │   │   ├── SchemasHeader.tsx
│   │   │   │   ├── SchemasTable.tsx
│   │   │   │   ├── SelectedSchemaAlert.tsx
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── table-browser/          # Модуль Table Browser (9 файлів)
│   │   │   │   ├── EmptyTableState.tsx
│   │   │   │   ├── TableDataPreview.tsx
│   │   │   │   ├── TableHeaderCard.tsx
│   │   │   │   ├── TableListSidebar.tsx
│   │   │   │   ├── TableSchemaView.tsx
│   │   │   │   ├── data.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── triggers-rules/         # Модуль Triggers/Rules (6 файлів)
│   │   │       ├── RulesTable.tsx
│   │   │       ├── TriggersTable.tsx
│   │   │       ├── data.ts
│   │   │       ├── types.ts
│   │   │       ├── utils.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── hooks/                      # Admin hooks
│   │   │   └── useDashboardCustomization.ts
│   │   │
│   │   ├── logs/                       # Модуль Logs (14 файлів)
│   │   │   ├── LogDetailsContent.tsx
│   │   │   ├── LogDetailsModal.tsx
│   │   │   ├── LogFilters.tsx
│   │   │   ├── LogLevelBadge.tsx
│   │   │   ├── LogStats.tsx
│   │   │   ├── LogStatsCard.tsx
│   │   │   ├── LogTableRow.tsx
│   │   │   ├── LogsHeader.tsx
│   │   │   ├── LogsTable.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── PaginationControls.tsx
│   │   │   ├── PaginationInfo.tsx
│   │   │   ├── data.ts
│   │   │   ├── types.ts
│   │   │   ├── utils.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── pages/                      # Головні сторінки адмін панелі
│   │   │   ├── AuditLog.tsx            # Аудит дій
│   │   │   ├── CLI.tsx                 # CLI інтерфейс
│   │   │   ├── Dashboard.tsx           # Головна панель
│   │   │   ├── DatabaseManager.tsx     # Менеджер БД
│   │   │   ├── PerformanceAnalyzer.tsx # Аналіз продуктивності
│   │   │   ├── PostgresConfig.tsx      # Конфігурація PostgreSQL
│   │   │   ├── ReplicaClusters.tsx     # Управління репліками
│   │   │   ├── RolesManager.tsx        # Управління ролями
│   │   │   ├── SystemMonitor.tsx       # Моніторинг системи
│   │   │   ├── UserUIPreview.tsx       # Попередній перегляд User UI
│   │   │   ├── UsersManager.tsx        # Управління користувачами
│   │   │   │
│   │   │   ├── audit-log/              # Модуль Audit Log (8 файлів)
│   │   │   │   ├── ActionTypeStats.tsx
│   │   │   │   ├── AuditFilters.tsx
│   │   │   │   ├── AuditLogTable.tsx
│   │   │   │   ├── AuditStatisticsCards.tsx
│   │   │   │   ├── data.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── cli/                    # Модуль CLI (9 файлів)
│   │   │   │   ├── AddCommandDialog.tsx
│   │   │   │   ├── AddExampleDialog.tsx
│   │   │   │   ├── CommandHistoryItem.tsx
│   │   │   │   ├── CommonCommands.tsx
│   │   │   │   ├── SQLExamples.tsx
│   │   │   │   ├── TerminalWindow.tsx
│   │   │   │   ├── data.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── config/                 # Модуль PostgreSQL Config (14 файлів)
│   │   │   │   ├── ConfigAccordion.tsx
│   │   │   │   ├── ConfigHeader.tsx
│   │   │   │   ├── ConfigPreview.tsx
│   │   │   │   ├── ConfigStatistics.tsx
│   │   │   │   ├── ImportDialog.tsx
│   │   │   │   ├── ProfilesManager.tsx
│   │   │   │   ├── QuickPresets.tsx
│   │   │   │   ├── RestartAlert.tsx
│   │   │   │   ├── RestartDialog.tsx
│   │   │   │   ├── SaveProfileDialog.tsx
│   │   │   │   ├── data.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── dashboard/              # Модуль Dashboard (9 файлів)
│   │   │   │   ├── ActiveConnectionsCard.tsx
│   │   │   │   ├── CustomizeDialog.tsx
│   │   │   │   ├── DashboardHeader.tsx
│   │   │   │   ├── PerformanceOverview.tsx
│   │   │   │   ├── RecentActivityCard.tsx
│   │   │   │   ├── StatsGrid.tsx
│   │   │   │   ├── data.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── performance/            # Модуль Performance (8 файлів)
│   │   │   │   ├── CacheStatsCards.tsx
│   │   │   │   ├── IndexUsageTable.tsx
│   │   │   │   ├── PerformanceHeader.tsx
│   │   │   │   ├── QueryStatsTable.tsx
│   │   │   │   ├── SlowQueriesAlert.tsx
│   │   │   │   ├── SlowQueriesCard.tsx
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── replicas/               # Модуль Replica Clusters (10 файлів)
│   │   │   │   ├── AddReplicaDialog.tsx
│   │   │   │   ├── ClusterDetailsTable.tsx
│   │   │   │   ├── ReplicaHeader.tsx
│   │   │   │   ├── ReplicationActivityTable.tsx
│   │   │   │   ├── ReplicationStats.tsx
│   │   │   │   ├── TopologyDiagram.tsx
│   │   │   │   ├── data.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── system-monitor/         # Модуль System Monitor (12 файлів)
│   │   │   │   ├── ActiveConnectionsTable.tsx
│   │   │   │   ├── ConnectionRow.tsx
│   │   │   │   ├── DatabaseStatsRow.tsx
│   │   │   │   ├── DatabaseStatsTable.tsx
│   │   │   │   ├── SlowQueriesCard.tsx
│   │   │   │   ├── SlowQueryItem.tsx
│   │   │   │   ├── SystemMonitorHeader.tsx
│   │   │   │   ├── SystemStatCard.tsx
│   │   │   │   ├── SystemStatsGrid.tsx
│   │   │   │   ├── data.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── user-ui-preview/        # Модуль User UI Preview (14 файлів)
│   │   │   │   ├── ActionButton.tsx
│   │   │   │   ├── DeviceSelector.tsx
│   │   │   │   ├── MockUserInterface.tsx
│   │   │   │   ├── PermissionItem.tsx
│   │   │   │   ├── PermissionsPanel.tsx
│   │   │   │   ├── PreviewHeader.tsx
│   │   │   │   ├── PreviewWindow.tsx
│   │   │   │   ├── RoleSelector.tsx
│   │   │   │   ├── UIContent.tsx
│   │   │   │   ├── UIHeader.tsx
│   │   │   │   ├── UINavigation.tsx
│   │   │   │   ├── data.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── users-manager/          # Модуль Users Manager (9 файлів)
│   │   │       ├── EditUserModalWrapper.tsx
│   │   │       ├── MicrosoftADInfoBanner.tsx
│   │   │       ├── UserStatsCard.tsx
│   │   │       ├── UserStatsCards.tsx
│   │   │       ├── UserTableCard.tsx
│   │   │       ├── UserTabs.tsx
│   │   │       ├── data.ts
│   │   │       ├── types.ts
│   │   │       ├── utils.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── roles/                      # Управління ролями RBAC
│   │   │   ├── AdminRolesPanel.tsx
│   │   │   ├── CreateRoleModal.tsx
│   │   │   ├── EditAdminRoleModal.tsx
│   │   │   ├── EditUserRoleModal.tsx
│   │   │   ├── RBACMatrix.tsx
│   │   │   ├── RoleCard.tsx
│   │   │   ├── RoleHistory.tsx
│   │   │   ├── RolesGrid.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   ├── UserRolesPanel.tsx
│   │   │   │
│   │   │   ├── create-role-modal/      # Модуль Create Role (17 файлів)
│   │   │   │   ├── BasicInfo.tsx
│   │   │   │   ├── DisplaySettingCard.tsx
│   │   │   │   ├── ModalFooter.tsx
│   │   │   │   ├── ModalHeader.tsx
│   │   │   │   ├── RlsExpressions.tsx
│   │   │   │   ├── RlsOperations.tsx
│   │   │   │   ├── RlsSettings.tsx
│   │   │   │   ├── RlsTableCard.tsx
│   │   │   │   ├── RoleTypeOption.tsx
│   │   │   │   ├── RoleTypeSelector.tsx
│   │   │   │   ├── UiDisplaySettings.tsx
│   │   │   │   ├── UiMenuItemCard.tsx
│   │   │   │   ├── UiVisibilitySettings.tsx
│   │   │   │   ├── data.ts
│   │   │   │   ├── types.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── rbac-matrix/            # Модуль RBAC Matrix (12 файлів)
│   │   │   │   ├── CategoryHeader.tsx
│   │   │   │   ├── MatrixHeader.tsx
│   │   │   │   ├── MatrixTabs.tsx
│   │   │   │   ├── PermissionCategoryCard.tsx
│   │   │   │   ├── PermissionTable.tsx
│   │   │   │   ├── PermissionTableHeader.tsx
│   │   │   │   ├── PermissionTableRow.tsx
│   │   │   │   ├── PermissionsTabContent.tsx
│   │   │   │   ├── RoleCell.tsx
│   │   │   │   ├── types.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── shared/                 # Спільні компоненти ролей (4 файли)
│   │   │   │   ├── EditModalFooter.tsx
│   │   │   │   ├── EditModalHeader.tsx
│   │   │   │   ├── EditableBasicInfo.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   ├── users/                      # Управління користувачами
│   │   │   ├── CreateUserModal.tsx
│   │   │   ├── EditUserPermissionsModal.tsx  # Головний компонент (79 рядків)
│   │   │   ├── UserTable.tsx
│   │   │   │
│   │   │   ├── edit-user-permissions/  # Модуль прав доступу (16 файлів)
│   │   │   │   ├── components/         # UI компоненти (6 файлів)
│   │   │   │   │   ├── ADWarning.tsx
│   │   │   │   │   ├── DialogHeaderUser.tsx
│   │   │   │   │   ├── PermissionCategoryItem.tsx
│   │   │   │   │   ├── PermissionsCategoriesList.tsx
│   │   │   │   │   ├── RoleSelector.tsx
│   │   │   │   │   └── TimezoneSelector.tsx
│   │   │   │   ├── hooks/              # React hooks (2 файли)
│   │   │   │   │   ├── usePermissionHandlers.ts
│   │   │   │   │   └── usePermissionsState.ts
│   │   │   │   ├── utils/              # Утиліти (2 файли)
│   │   │   │   │   ├── permissionUtils.ts
│   │   │   │   │   └── themeUtils.ts
│   │   │   │   ├── data/               # Конфігурація (2 файли)
│   │   │   │   │   ├── permissionCategories.ts
│   │   │   │   │   └── roleConfig.ts
│   │   │   │   ├── types.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── user/                           # Користувацька панель (Violet тема)
│   │   ├── AccessedTableItem.tsx
│   │   ├── ActivityRecordItem.tsx
│   │   ├── BrowserTabs.tsx
│   │   ├── CreateRecord.tsx
│   │   ├── DatabaseBrowser.tsx
│   │   ├── DatabaseCard.tsx
│   │   ├── EditRecord.tsx
│   │   ├── TableDataEditor.tsx
│   │   ├── UserApplication.tsx
│   │   ├── UserApplicationHeader.tsx
│   │   ├── UserDashboard.tsx
│   │   ├── UserProfile.tsx
│   │   │
│   │   ├── browser-tabs/              # Модуль Browser Tabs (11 файлів)
│   │   │   ├── NewTabButton.tsx
│   │   │   ├── TabActiveIndicator.tsx
│   │   │   ├── TabCloseButton.tsx
│   │   │   ├── TabItem.tsx
│   │   │   ├── TabLoadingIndicator.tsx
│   │   │   ├── TabScrollButton.tsx
│   │   │   ├── TabsList.tsx
│   │   │   ├── types.ts
│   │   │   ├── useTabScroll.ts
│   │   │   ├── utils.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── browser/                   # Database Browser (4 файли)
│   │   │   ├── DatabaseSidebar.tsx
│   │   │   ├── TableListItem.tsx
│   │   │   ├── TablesList.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── dashboard/                 # User Dashboard (3 файли)
│   │   │   ├── ActivitySection.tsx
│   │   │   ├── DatabaseGrid.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── database-browser/          # Модуль Database Browser (8 файлів)
│   │   │   ├── DatabaseBrowserGridView.tsx
│   │   │   ├── DatabaseBrowserHeader.tsx
│   │   │   ├── DatabaseBrowserTablesView.tsx
│   │   │   ├── mockDatabases.ts
│   │   │   ├── types.ts
│   │   │   ├── useDatabaseBrowser.ts
│   │   │   ├── utils.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── form/                      # Форми для запису даних (8 файлів)
│   │   │   ├── DeleteConfirmation.tsx
│   │   │   ├── ExistingFilesList.tsx
│   │   │   ├── FieldInput.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── FormField.tsx
│   │   │   ├── RecordBreadcrumb.tsx
│   │   │   ├── formUtils.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/                     # User hooks (2 файли)
│   │   │   ├── useNavigationHandlers.ts
│   │   │   └── useTabNavigation.ts
│   │   │
│   │   ├── profile/                   # User Profile (3 файли)
│   │   │   ├── DatabaseAccessCard.tsx
│   │   │   ├── UserInfoCard.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── record-form/               # Модуль Record Form (8 файлів)
│   │   │   ├── EditRecordFileManager.tsx
│   │   │   ├── RecordFormActions.tsx
│   │   │   ├── RecordFormCard.tsx
│   │   │   ├── RecordFormFields.tsx
│   │   │   ├── RecordFormHeader.tsx
│   │   │   ├── types.ts
│   │   │   ├── useRecordForm.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── table-data-editor/         # Модуль Table Editor (12 файлів)
│   │   │   ├── RecordCreateModal.tsx
│   │   │   ├── RecordDeleteModal.tsx
│   │   │   ├── RecordEditModal.tsx
│   │   │   ├── RecordFormFields.tsx
│   │   │   ├── TableColumnHeader.tsx
│   │   │   ├── TableDataGrid.tsx
│   │   │   ├── TableDataRow.tsx
│   │   │   ├── TableEmptyState.tsx
│   │   │   ├── permissionUtils.ts
│   │   │   ├── recordUtils.ts
│   │   │   ├── types.ts
│   │   │   ├── useTableDataEditor.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── table/                     # Компоненти таблиць (5 файлів)
│   │   │   ├── TableHeader.tsx
│   │   │   ├── TableInfoCard.tsx
│   │   │   ├── TablePagination.tsx
│   │   │   ├── TableSearchBar.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── user-application/          # Модуль User App (5 файлів)
│   │   │   ├── UserApplicationLayout.tsx
│   │   │   ├── ViewRouter.tsx
│   │   │   ├── mockData.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── ui/                            # shadcn/ui компоненти (50+ файлів)
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── tooltip.tsx
│   │   └── ... (інші shadcn компоненти)
│   │
│   ├── figma/                         # Figma інтеграція
│   │   └── ImageWithFallback.tsx
│   │
│   └── global/                        # Глобальні компоненти
│       └── HomePage.tsx
│
├── mockData/                          # Mock дані для розробки
│   ├── admin/                         # Admin mock data (18 файлів)
│   │   ├── auditLog.ts
│   │   ├── backups.ts
│   │   ├── cli.ts
│   │   ├── dashboard.ts
│   │   ├── dataTypes.ts
│   │   ├── databases.ts
│   │   ├── extensions.ts
│   │   ├── foreignServers.ts
│   │   ├── functions.ts
│   │   ├── monitoring.ts
│   │   ├── navigation.ts
│   │   ├── performance.ts
│   │   ├── permissions.ts
│   │   ├── postgresConfig.ts
│   │   ├── queries.ts
│   │   ├── roles.ts
│   │   ├── schemaVisualizer.ts
│   │   ├── schemas.ts
│   │   ├── tableBrowser.ts
│   │   ├── tables.ts
│   │   ├── triggers.ts
│   │   ├── users.ts
│   │   └── index.ts
│   │
│   ├── user/                          # User mock data (5 файлів)
│   │   ├── dashboard.ts
│   │   ├── profile.ts
│   │   ├── tableschemas.ts
│   │   ├── userRoles.ts
│   │   └── index.ts
│   │
│   └── index.ts
│
├── styles/                            # Глобальні стилі
│   └── globals.css                    # Tailwind + custom CSS
│
└── guidelines/                        # Документація
    └── Guidelines.md
```

---

## 🎨 Теми та стилізація

### Admin Theme (Olive/Lime)
**Колірна палітра:**
- Primary gradient: `from-lime-500 to-green-600`
- Hover: `from-lime-600 to-green-700`
- Icons: `lime-600`
- Backgrounds: `lime-50`, `lime-100`
- Borders: `lime-200`, `lime-300`
- Info boxes: `amber-50` background, `amber-200` border

**Використання:**
```tsx
import { getButtonGradient, getIconColorClasses } from './utils/themeUtils';

<Button className={getButtonGradient('admin')}>
  Save
</Button>
```

### User Theme (Violet/Purple)
**Колірна палітра:**
- Primary gradient: `from-violet-500 to-purple-600`
- Hover: `from-violet-600 to-purple-700`
- Icons: `violet-600`
- Backgrounds: `violet-50`, `violet-100`
- Borders: `violet-200`, `violet-300`
- Info boxes: `blue-50` background, `blue-200` border

**Автоматична адаптація:**
Всі компоненти приймають `userType: 'admin' | 'user'` prop і автоматично застосовують правильну тему.

### Typography
**Глобальні стилі** (`/styles/globals.css`):
- Не використовуємо Tailwind класи для font-size, font-weight, line-height
- Всі типографічні стилі в globals.css
- HTML елементи мають дефолтні стилі

---

## 🚀 Потенційні доповнення

### 🔐 Безпека та автентифікація
- [ ] **OAuth 2.0 / OpenID Connect** - інтеграція з enterprise SSO
- [ ] **Two-Factor Authentication (2FA)** - додатковий рівень безпеки
- [ ] **LDAP Integration** - крім AD, підтримка інших directory services
- [ ] **API Key Management** - генерація та управління API ключами
- [ ] **Session Management** - контроль активних сесій, force logout
- [ ] **IP Whitelisting** - обмеження доступу по IP
- [ ] **Audit Trail Encryption** - шифрування логів аудиту
- [ ] **Role-based 2FA** - обов'язкова 2FA для певних ролей

### 📊 Моніторинг та аналітика
- [ ] **Real-time Alerts** - push notifications для критичних подій
- [ ] **Custom Dashboards** - drag-and-drop конструктор дашбордів
- [ ] **Performance Trends** - історичні дані та тренди
- [ ] **Query Plan Analyzer** - візуальний аналіз планів запитів (EXPLAIN ANALYZE)
- [ ] **Capacity Planning** - прогнозування зростання даних
- [ ] **SLA Monitoring** - відстеження дотримання SLA
- [ ] **Custom Metrics** - користувацькі метрики та KPI
- [ ] **Anomaly Detection** - ML-based виявлення аномалій
- [ ] **APM Integration** - інтеграція з Datadog, New Relic, Prometheus

### 🗄️ Database Features
- [ ] **Partitioning Manager** - управління таблицями з партиціями
- [ ] **Materialized Views** - створення та refresh mat views
- [ ] **Full-Text Search** - інтерфейс для PostgreSQL FTS
- [ ] **JSONB Editor** - візуальний редактор JSON даних
- [ ] **Array/HSTORE Editor** - спеціалізовані редактори для складних типів
- [ ] **Custom Aggregates** - створення власних агрегатних функцій
- [ ] **Table Inheritance** - управління успадкуванням таблиць
- [ ] **Logical Replication** - налаштування logical replication
- [ ] **Publication/Subscription** - управління pub/sub для logical replication
- [ ] **Foreign Tables Wizard** - покроковий майстер для foreign tables

### 🔧 Developer Tools
- [ ] **GraphQL Endpoint Generator** - автоматична генерація GraphQL API
- [ ] **REST API Generator** - автоматична генерація REST endpoints
- [ ] **ER Diagram Export** - експорт схем у різні формати (PNG, SVG, PDF, PlantUML)
- [ ] **Database Diff Tool** - порівняння схем різних БД
- [ ] **Migration Generator** - автоматична генерація міграційних скриптів
- [ ] **Seed Data Manager** - управління тестовими даними
- [ ] **SQL Formatter** - автоматичне форматування SQL запитів
- [ ] **Query Builder UI** - візуальний конструктор запитів
- [ ] **Data Masking** - маскування чутливих даних для dev/test
- [ ] **Version Control Integration** - Git integration для SQL скриптів

### 📈 Data Import/Export
- [ ] **CSV/Excel Import Wizard** - покроковий імпорт з валідацією
- [ ] **JSON/XML Import** - імпорт структурованих даних
- [ ] **ETL Pipelines** - візуальний конструктор ETL процесів
- [ ] **Scheduled Exports** - автоматичний експорт даних за розкладом
- [ ] **Data Validation Rules** - custom правила валідації при імпорті
- [ ] **Cloud Storage Integration** - S3, Azure Blob, Google Cloud Storage
- [ ] **Streaming Data Import** - імпорт великих файлів потоково
- [ ] **Data Transformation** - трансформація даних під час імпорту

### 🛡️ Backup & DR (Disaster Recovery)
- [ ] **Point-in-Time Recovery (PITR)** - відновлення до конкретного моменту
- [ ] **Incremental Backups** - інкрементні резервні копії
- [ ] **Cross-Region Replication** - реплікація між регіонами/датацентрами
- [ ] **Automated Failover** - автоматичне перемикання на репліку
- [ ] **Backup Encryption** - шифрування backup файлів
- [ ] **Backup Retention Policies** - автоматичне видалення старих backup
- [ ] **Disaster Recovery Drills** - тестування DR процедур
- [ ] **Backup to Cloud** - резервування в AWS S3, Azure, GCP

### 🎨 UI/UX Improvements
- [ ] **Dark Mode** - темна тема для інтерфейсу
- [ ] **Custom Themes** - створення власних колірних схем
- [ ] **Keyboard Shortcuts** - hotkeys для швидкої роботи
- [ ] **Command Palette** - Cmd+K для швидкої навігації
- [ ] **Favorites/Bookmarks** - збереження улюблених запитів/таблиць
- [ ] **Workspaces** - збереження стану робочого простору
- [ ] **Multi-Language Support** - англійська, польська, інші мови
- [ ] **Accessibility (a11y)** - WCAG 2.1 AA compliance
- [ ] **Mobile App** - React Native версія для read-only доступу

### 🤖 Automation & AI
- [ ] **SQL Query Optimization Suggestions** - AI-powered recommendations
- [ ] **Natural Language to SQL** - генерація SQL з природної мови
- [ ] **Automated Index Suggestions** - аналіз та пропозиції індексів
- [ ] **Auto-Vacuum Tuning** - автоматичне налаштування vacuum
- [ ] **Chatbot Assistant** - AI помічник для роботи з БД
- [ ] **Anomaly Detection ML** - machine learning для виявлення проблем
- [ ] **Predictive Scaling** - прогнозування необхідних ресурсів

### 📱 Integrations
- [ ] **Slack/Teams Notifications** - інтеграція з месенджерами
- [ ] **Jira Integration** - створення тікетів з audit log
- [ ] **Webhook Support** - тригери для зовнішніх систем
- [ ] **Email Alerts** - сповіщення на email
- [ ] **PagerDuty/Opsgenie** - інтеграція з on-call системами
- [ ] **BI Tools Integration** - Tableau, Power BI, Looker connectors
- [ ] **CI/CD Integration** - GitHub Actions, GitLab CI, Jenkins
- [ ] **Documentation Sync** - автогенерація документації схем

### 🧪 Testing & Quality
- [ ] **Query Performance Testing** - benchmark suite
- [ ] **Load Testing** - симуляція навантаження
- [ ] **Data Quality Checks** - валідація консистентності даних
- [ ] **Schema Validation** - перевірка схеми на best practices
- [ ] **Security Scanning** - виявлення SQL injection, XSS
- [ ] **Compliance Reports** - GDPR, SOC2, HIPAA compliance

### 🔄 Collaboration Features
- [ ] **Shared Queries** - спільні запити між користувачами
- [ ] **Comments & Annotations** - коментарі до таблиць/колонок
- [ ] **Change Requests** - процес затвердження змін схеми
- [ ] **Team Workspaces** - спільні робочі простори
- [ ] **Activity Feed** - стрічка активності команди
- [ ] **Notifications Center** - централізовані сповіщення

### 💾 Advanced Data Features
- [ ] **Time-Series Data Support** - оптимізація для TimescaleDB
- [ ] **Geographic Data Tools** - підтримка PostGIS з картами
- [ ] **Vector Embeddings** - підтримка pgvector для AI/ML
- [ ] **Graph Database Features** - візуалізація graph даних
- [ ] **Data Lineage Tracking** - відстеження походження даних
- [ ] **Data Catalog** - metadata management для великих систем

### 📊 Reporting
- [ ] **Custom Report Builder** - конструктор звітів
- [ ] **Scheduled Reports** - автоматична генерація звітів
- [ ] **PDF/Excel Export** - експорт звітів у різні формати
- [ ] **Dashboard Sharing** - публікація дашбордів для stakeholders
- [ ] **Embedded Analytics** - вбудовані аналітичні дашборди

### 🏗️ Infrastructure
- [ ] **Multi-Tenancy** - підтримка множинних організацій
- [ ] **Kubernetes Integration** - деплой на K8s
- [ ] **Docker Compose Setup** - готова dev environment
- [ ] **Terraform Modules** - IaC для інфраструктури
- [ ] **High Availability Setup** - автоматичне налаштування HA
- [ ] **Connection Pooling (PgBouncer)** - інтеграція з connection pooler
- [ ] **CDN Integration** - кешування статичних ресурсів

### 🎓 Documentation & Learning
- [ ] **Interactive Tutorials** - покрокові уроки для нових користувачів
- [ ] **Video Guides** - відео інструкції
- [ ] **SQL Playground** - навчальне середовище
- [ ] **Best Practices Guide** - рекомендації по роботі з PostgreSQL
- [ ] **Glossary** - словник термінів
- [ ] **Release Notes** - автоматична генерація changelog

### 🔬 Advanced Admin Features
- [ ] **Connection Pool Monitor** - моніторинг з'єднань
- [ ] **Lock Monitor** - візуалізація блокувань (locks)
- [ ] **Deadlock Detector** - аналіз deadlocks
- [ ] **Bloat Monitor** - відстеження table/index bloat
- [ ] **WAL Archive Manager** - управління Write-Ahead Log
- [ ] **Custom Background Workers** - створення background jobs
- [ ] **Event Triggers** - налаштування DDL triggers
- [ ] **Table Statistics** - детальна статистика pg_stat_*

---

## 📝 Додаткова інформація

### Розробка
```bash
# Встановлення залежностей
npm install

# Запуск dev сервера
npm run dev

# Build production
npm run build

# Перевірка типів
npm run type-check

# Linting
npm run lint
```

### Структура файлів модуля
Кожен модуль слідує структурі:
```
module-name/
├── components/         # UI компоненти
├── hooks/             # React hooks
├── utils/             # Utility functions
├── data/              # Configuration & constants
├── types.ts           # TypeScript interfaces
└── index.ts           # Barrel exports
```

### Naming Conventions
- **Components:** PascalCase (e.g., `UserTable.tsx`)
- **Hooks:** camelCase з префіксом "use" (e.g., `usePermissionsState.ts`)
- **Utils:** camelCase (e.g., `permissionUtils.ts`)
- **Types:** PascalCase interfaces (e.g., `export interface User`)
- **Folders:** kebab-case (e.g., `edit-user-permissions/`)

### Git Workflow
```bash
# Feature branch
git checkout -b feature/new-module

# Commit convention
git commit -m "feat: add new module for XYZ"
git commit -m "fix: resolve issue with ABC"
git commit -m "docs: update README for module"
git commit -m "refactor: split monolithic component"
```

---

## 📄 Ліцензія

**Proprietary - Internal Use Only**  
Корпоративна система для внутрішнього використання.

---

**PostgreSQL DBMS v1.0**  
**Last Updated:** December 2024  
**Made with ❤️ in Ukraine 🇺🇦**