# 🔐 Roles Manager - RBAC управління

**Загальна кількість файлів:** 90+ файлів

```
📁 roles/
├── 📄 AdminRolesPanel.tsx (49 рядків)
├── 📄 CreateRoleModal.tsx (132 рядки)
├── 📄 EditAdminRoleModal.tsx (130 рядків)
├── 📄 EditUserRoleModal.tsx (111 рядків)
├── 📄 RBACMatrix.tsx (63 рядки)
├── 📄 RoleHistory.tsx (78 рядків)
├── 📄 RolesGrid.tsx (25 рядків)
├── 📄 UserRolesPanel.tsx (49 рядків)
├── 📄 index.ts (14 рядків)
│
├── 📁 create-role-modal/                    # 34 файли
│   ├── 📄 BasicInfo.tsx (50 рядків)
│   ├── 📄 DisplaySettingCard.tsx (39 рядків)
│   ├── 📄 ModalFooter.tsx (33 рядки)
│   ├── 📄 ModalHeader.tsx (21 рядок)
│   ├── 📄 RlsExpressions.tsx (53 рядки)
│   ├── 📄 RlsOperations.tsx (48 рядків)
│   ├── 📄 RlsSettings.tsx (51 рядок)
│   ├── 📄 RlsTableCard.tsx (60 рядків)
│   ├── 📄 RoleTypeOption.tsx (52 рядки)
│   ├── 📄 RoleTypeSelector.tsx (33 рядки)
│   ├── 📄 UiDisplaySettings.tsx (57 рядків)
│   ├── 📄 UiMenuItemCard.tsx (33 рядки)
│   ├── 📄 UiVisibilitySettings.tsx (42 рядки)
│   ├── 📄 data.ts (36 рядків)
│   ├── 📄 index.ts (47 рядків)
│   ├── 📄 types.ts (187 рядків)
│   │
│   ├── 📁 data/                             # 7 файлів
│   │   ├── 📄 defaultSettings.ts (76 рядків)
│   │   ├── 📄 index.ts (56 рядків)
│   │   ├── 📄 menuItems.ts (124 рядки)
│   │   ├── 📄 roleTypes.ts (89 рядків)
│   │   ├── 📄 styleConstants.ts (94 рядки)
│   │   ├── 📄 textConstants.ts (156 рядків)
│   │   └── 📄 validationConstants.ts (67 рядків)
│   │
│   └── 📁 utils/                            # 14 файлів
│       ├── 📄 config.ts (48 рядків)
│       ├── 📄 counters.ts (42 рядки)
│       ├── 📄 exportConfig.ts (78 рядків)
│       ├── 📄 filters.ts (54 рядки)
│       ├── 📄 getters.ts (124 рядки)
│       ├── 📄 index.ts (74 рядки)
│       ├── 📄 sqlGenerators.ts (102 рядки)
│       ├── 📄 stateUpdaters.ts (134 рядки)
│       ├── 📄 styleHelpers.ts (156 рядків)
│       ├── 📄 styleUtils.ts (89 рядків)
│       ├── 📄 textHelpers.ts (67 рядків)
│       ├── 📄 uiHelpers.ts (72 рядки)
│       ├── 📄 validation.ts (94 рядки)
│       └── 📄 validators.ts (112 рядків)
│
├── 📁 rbac-matrix/                          # 17 файлів
│   ├── 📄 CategoryHeader.tsx (34 рядки)
│   ├── 📄 MatrixHeader.tsx (21 рядок)
│   ├── 📄 MatrixTabs.tsx (42 рядки)
│   ├── 📄 PermissionCategoryCard.tsx (67 рядків)
│   ├── 📄 PermissionTable.tsx (54 рядки)
│   ├── 📄 PermissionTableHeader.tsx (38 рядків)
│   ├── 📄 PermissionTableRow.tsx (56 рядків)
│   ├── 📄 PermissionsTabContent.tsx (78 рядків)
│   ├── 📄 RoleCell.tsx (29 рядків)
│   ├── 📄 index.ts (15 рядків)
│   ├── 📄 types.ts (31 рядок)
│   │
│   └── 📁 utils/                            # 7 файлів
│       ├── 📄 categoryUtils.ts (48 рядків)
│       ├── 📄 colorUtils.ts (56 рядків)
│       ├── 📄 getColorClasses.ts (42 рядки)
│       ├── 📄 getRoleTypeLabel.ts (18 рядків)
│       ├── 📄 index.ts (16 рядків)
│       ├── 📄 labelUtils.ts (34 рядки)
│       └── 📄 toggleCategory.ts (24 рядки)
│
├── 📁 role-card/                            # 11 файлів
│   ├── 📄 RoleCard.tsx (48 рядків)
│   ├── 📄 index.ts (4 рядки)
│   ├── 📄 types.ts (22 рядки)
│   │
│   ├── 📁 components/                       # 5 файлів
│   │   ├── 📄 ActionButtons.tsx (56 рядків)
│   │   ├── 📄 RoleIcon.tsx (34 рядки)
│   │   ├── 📄 TitleOverlay.tsx (18 рядків)
│   │   ├── 📄 UserCountBadge.tsx (24 рядки)
│   │   └── 📄 index.ts (9 рядків)
│   │
│   └── 📁 utils/                            # 2 файли
│       ├── 📄 cardStyles.ts (67 рядків)
│       └── 📄 index.ts (8 рядків)
│
├── 📁 shared/                               # 4 файли
│   ├── 📄 EditModalFooter.tsx (38 рядків)
│   ├── 📄 EditModalHeader.tsx (45 рядків)
│   ├── 📄 EditableBasicInfo.tsx (72 рядки)
│   └── 📄 index.ts (7 рядків)
│
└── 📁 stats-cards/                          # 7 файлів
    ├── 📄 SingleStatCard.tsx (42 рядки)
    ├── 📄 StatsCards.tsx (53 рядки)
    ├── 📄 index.ts (5 рядків)
    ├── 📄 types.ts (28 рядків)
    │
    └── 📁 data/                             # 2 файли
        ├── 📄 index.ts (3 рядки)
        └── 📄 statsConfig.ts (54 рядки)
```
