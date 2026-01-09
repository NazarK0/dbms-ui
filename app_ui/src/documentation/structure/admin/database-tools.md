# 🔧 Database Tools - Інструменти БД

**Загальна кількість файлів:** 170+ файлів

## Структура

```
📁 database-tools/
├── 📄 BackupRestore.tsx (168 рядків)
├── 📄 DataTypesManager.tsx (157 рядків)
├── 📄 ExtensionManager.tsx (85 рядків)
├── 📄 ForeignServersManager.tsx (123 рядки)
├── 📄 ForeignTablesManager.tsx (105 рядків)
├── 📄 FunctionsManager.tsx (117 рядків)
├── 📄 QueryExecutor.tsx (234 рядки)
├── 📄 SchemaVisualizer.tsx (199 рядків)
├── 📄 SchemasManager.tsx (163 рядки)
├── 📄 TableBrowser.tsx (233 рядки)
├── 📄 TriggersRules.tsx (137 рядків)
│
├── 📁 backup-restore/                       # 11 файлів
│   ├── 📄 BackupActions.tsx (32 рядки)
│   ├── 📄 BackupHeader.tsx (26 рядків)
│   ├── 📄 BackupProgress.tsx (23 рядки)
│   ├── 📄 BackupsTable.tsx (67 рядків)
│   ├── 📄 RestoreUpload.tsx (18 рядків)
│   ├── 📄 RestoreWarning.tsx (18 рядків)
│   ├── 📄 ScheduleActions.tsx (30 рядків)
│   ├── 📄 ScheduleHeader.tsx (25 рядків)
│   ├── 📄 SchedulesTable.tsx (69 рядків)
│   ├── 📄 index.ts (12 рядків)
│   └── 📄 utils.ts (39 рядків)
│
├── 📁 data-types/                           # 10 файлів
│   ├── 📄 CompositeTypesTable.tsx (71 рядок)
│   ├── 📄 CreateTypeModal.tsx (135 рядків)
│   ├── 📄 DomainTypesTable.tsx (68 рядків)
│   ├── 📄 EnumTypesTable.tsx (71 рядок)
│   ├── 📄 TypeActions.tsx (35 рядків)
│   ├── 📄 TypesHeader.tsx (33 рядки)
│   ├── 📄 TypesInfoAlert.tsx (14 рядків)
│   ├── 📄 TypesSearchBar.tsx (27 рядків)
│   ├── 📄 index.ts (12 рядків)
│   └── 📄 utils.ts (52 рядки)
│
├── 📁 foreign-servers/                      # 22 файли
│   ├── 📄 CreateServerModal.tsx (12 рядків)
│   ├── 📄 FDWNotInstalledAlert.tsx (23 рядки)
│   ├── 📄 ServerActions.tsx (44 рядки)
│   ├── 📄 ServersHeader.tsx (33 рядки)
│   ├── 📄 ServersInfoAlert.tsx (14 рядків)
│   ├── 📄 ServersSearchBar.tsx (27 рядків)
│   ├── 📄 ServersTable.tsx (80 рядків)
│   ├── 📄 index.ts (23 рядки)
│   ├── 📄 utils.tsx (53 рядки)
│   │
│   └── 📁 create-server-modal/              # 12 файлів
│       ├── 📄 ConnectionSettings.tsx (47 рядків)
│       ├── 📄 DatabaseNameInput.tsx (28 рядків)
│       ├── 📄 ModalFooter.tsx (36 рядків)
│       ├── 📄 ModalHeader.tsx (19 рядків)
│       ├── 📄 ServerInfoAlert.tsx (19 рядків)
│       ├── 📄 ServerNameInput.tsx (29 рядків)
│       ├── 📄 UserMappingInfoAlert.tsx (19 рядків)
│       ├── 📄 UsernameInput.tsx (29 рядків)
│       ├── 📄 WrapperTypeSelect.tsx (38 рядків)
│       ├── 📄 index.tsx (156 рядків)
│       ├── 📄 types.ts (39 рядків)
│       └── 📄 utils.ts (111 рядків)
│
├── 📁 foreign-tables/                       # 8 файлів
│   ├── 📄 CreateTableModal.tsx (143 рядки)
│   ├── 📄 ForeignTablesTable.tsx (76 рядків)
│   ├── 📄 TableActions.tsx (49 рядків)
│   ├── 📄 TablesHeader.tsx (31 рядок)
│   ├── 📄 TablesInfoAlert.tsx (14 рядків)
│   ├── 📄 TablesSearchBar.tsx (27 рядків)
│   ├── 📄 index.ts (10 рядків)
│   └── 📄 utils.tsx (65 рядків)
│
├── 📁 query-executor/                       # 48 файлів
│   ├── 📄 exports.ts (166 рядків)
│   ├── 📄 index.tsx (210 рядків)
│   ├── 📄 types.ts (117 рядків)
│   │
│   ├── 📁 query-editor/                     # 9 файлів
│   │   ├── 📄 DangerousQueryAlert.tsx (42 рядки)
│   │   ├── 📄 DatabaseAlert.tsx (18 рядків)
│   │   ├── 📄 QueryEditorActions.tsx (97 рядків)
│   │   ├── 📄 QueryEditorHeader.tsx (31 рядок)
│   │   ├── 📄 QueryEditorTextarea.tsx (28 рядків)
│   │   ├── 📄 ValidationErrorAlert.tsx (18 рядків)
│   │   ├── 📄 index.tsx (89 рядків)
│   │   ├── 📄 types.ts (73 рядки)
│   │   └── 📄 utils.ts (35 рядків)
│   │
│   ├── 📁 query-history/                    # 8 файлів
│   │   ├── 📄 QueryHistoryActions.tsx (44 рядки)
│   │   ├── 📄 QueryHistoryEmptyState.tsx (18 рядків)
│   │   ├── 📄 QueryHistoryHeader.tsx (39 рядків)
│   │   ├── 📄 QueryHistoryItemCard.tsx (62 рядки)
│   │   ├── 📄 QueryHistoryList.tsx (32 рядки)
│   │   ├── 📄 QueryHistoryMetadata.tsx (45 рядків)
│   │   ├── 📄 index.tsx (67 рядків)
│   │   └── 📄 types.ts (58 рядків)
│   │
│   ├── 📁 query-results/                    # 8 файлів
│   │   ├── 📄 QueryResultsActions.tsx (71 рядок)
│   │   ├── 📄 QueryResultsEmptyState.tsx (22 рядки)
│   │   ├── 📄 QueryResultsError.tsx (43 рядки)
│   │   ├── 📄 QueryResultsHeader.tsx (28 рядків)
│   │   ├── 📄 QueryResultsStats.tsx (54 рядки)
│   │   ├── 📄 QueryResultsTable.tsx (87 рядків)
│   │   ├── 📄 index.tsx (52 рядки)
│   │   └── 📄 types.ts (62 рядки)
│   │
│   ├── 📁 saved-queries/                    # 13 файлів
│   │   ├── 📄 SavedQueriesEmptyState.tsx (24 рядки)
│   │   ├── 📄 SavedQueriesHeader.tsx (23 рядки)
│   │   ├── 📄 SavedQueriesList.tsx (28 рядків)
│   │   ├── 📄 SavedQueriesSearch.tsx (27 рядків)
│   │   ├── 📄 SavedQueriesTagFilter.tsx (51 рядок)
│   │   ├── 📄 SavedQueryCard.tsx (38 рядків)
│   │   ├── 📄 SavedQueryCardActions.tsx (48 рядків)
│   │   ├── 📄 SavedQueryCardCode.tsx (23 рядки)
│   │   ├── 📄 SavedQueryCardHeader.tsx (32 рядки)
│   │   ├── 📄 SavedQueryCardMetadata.tsx (44 рядки)
│   │   ├── 📄 index.tsx (91 рядок)
│   │   ├── 📄 types.ts (89 рядків)
│   │   └── 📄 utils.ts (31 рядок)
│   │
│   └── 📁 utils/                            # 6 файлів
│       ├── 📄 export.ts (142 рядки)
│       ├── 📄 formatters.ts (97 рядків)
│       ├── 📄 history.ts (118 рядків)
│       ├── 📄 index.ts (24 рядки)
│       ├── 📄 query-type.ts (89 рядків)
│       └── 📄 validation.ts (156 рядків)
│
├── 📁 schemas/                              # 22 файли
│   ├── 📄 SchemaActions.tsx (52 рядки)
│   ├── 📄 SchemaTabNavigation.tsx (48 рядків)
│   ├── 📄 SchemaTabsContent.tsx (124 рядки)
│   ├── 📄 SchemasHeader.tsx (35 рядків)
│   ├── 📄 SchemasTable.tsx (93 рядки)
│   ├── 📄 SelectedSchemaAlert.tsx (18 рядків)
│   ├── 📄 index.ts (13 рядків)
│   ├── 📄 utils.ts (42 рядки)
│   │
│   └── 📁 create-schema-modal/              # 14 файлів
│       ├── 📄 ModalFooter.tsx (36 рядків)
│       ├── 📄 ModalHeader.tsx (19 рядків)
│       ├── 📄 PermissionsInfoAlert.tsx (21 рядок)
│       ├── 📄 SchemaDescriptionTextarea.tsx (27 рядків)
│       ├── 📄 SchemaNameInput.tsx (28 рядків)
│       ├── 📄 SchemaOwnerSelect.tsx (43 рядки)
│       ├── 📄 index.tsx (127 рядків)
│       ├── 📄 types.ts (34 рядки)
│       │
│       └── 📁 utils/                        # 5 файлів
│           ├── 📄 generators.ts (28 рядків)
│           ├── 📄 index.ts (12 рядків)
│           ├── 📄 permissions.ts (45 рядків)
│           ├── 📄 sanitizers.ts (22 рядки)
│           └── 📄 validators.ts (38 рядків)
│
├── 📁 table-browser/                        # 17 файлів
│   ├── 📄 EmptyTableState.tsx (26 рядків)
│   ├── 📄 TableDataPreview.tsx (112 рядків)
│   ├── 📄 TableHeaderCard.tsx (67 рядків)
│   ├── 📄 TableListSidebar.tsx (89 рядків)
│   ├── 📄 TableSchemaView.tsx (124 рядки)
│   ├── 📄 index.ts (14 рядків)
│   ├── 📄 types.ts (56 рядків)
│   │
│   └── 📁 utils/                            # 9 файлів
│       ├── 📄 analytics.ts (58 рядків)
│       ├── 📄 column-filters.ts (72 рядки)
│       ├── 📄 column-utils.ts (94 рядки)
│       ├── 📄 column-validators.ts (63 рядки)
│       ├── 📄 data-utils.ts (87 рядків)
│       ├── 📄 formatters.ts (76 рядків)
│       ├── 📄 generators.ts (54 рядки)
│       ├── 📄 index.ts (18 рядків)
│       └── 📄 validators.ts (82 рядки)
│
└── 📁 triggers-rules/                       # 14 файлів
    ├── 📄 RulesTable.tsx (118 рядків)
    ├── 📄 TriggersTable.tsx (142 рядки)
    ├── 📄 index.ts (11 рядків)
    ├── 📄 types.ts (67 рядків)
    ├── 📄 utils.ts (34 рядки)
    │
    └── 📁 utils/                            # 8 файлів
        ├── 📄 badgeUtils.ts (48 рядків)
        ├── 📄 filterUtils.ts (56 рядків)
        ├── 📄 formatUtils.ts (73 рядки)
        ├── 📄 index.ts (16 рядків)
        ├── 📄 searchUtils.ts (42 рядки)
        ├── 📄 sqlUtils.ts (91 рядок)
        ├── 📄 statsUtils.ts (67 рядків)
        └── 📄 validationUtils.ts (82 рядки)
```
