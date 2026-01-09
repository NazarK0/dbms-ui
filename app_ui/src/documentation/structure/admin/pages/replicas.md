# Replicas - Репліка кластери

**Загальна кількість файлів:** 43 файли

```
📁 replicas/
├── 📄 ReplicaHeader.tsx (64 рядки)
├── 📄 ReplicationActivityTable.tsx (112 рядків)
├── 📄 ReplicationStats.tsx (89 рядків)
├── 📄 data.ts (156 рядків)
├── 📄 index.ts (9 рядків)
├── 📄 types.ts (124 рядки)
│
├── 📁 add-replica/                          # 12 файлів
│   ├── 📄 AddReplicaDialog.tsx (178 рядків)
│   ├── 📄 index.ts (4 рядки)
│   │
│   ├── 📁 form-fields/                      # 6 файлів
│   │   ├── 📄 ReplicaHostField.tsx (34 рядки)
│   │   ├── 📄 ReplicaLocationField.tsx (42 рядки)
│   │   ├── 📄 ReplicaModeField.tsx (48 рядків)
│   │   ├── 📄 ReplicaNameField.tsx (32 рядки)
│   │   ├── 📄 ReplicaPortField.tsx (29 рядків)
│   │   └── 📄 index.ts (12 рядків)
│   │
│   └── 📁 hooks/                            # 1 файл
│       └── 📄 useReplicaForm.ts (94 рядки)
│
├── 📁 cluster-details/                      # 14 файлів
│   ├── 📄 ClusterDetailsTable.tsx (87 рядків)
│   ├── 📄 ClusterTableHeader.tsx (38 рядків)
│   ├── 📄 ClusterTableRow.tsx (56 рядків)
│   ├── 📄 index.ts (7 рядків)
│   │
│   └── 📁 cells/                            # 9 файлів
│       ├── 📄 ClusterActionsCell.tsx (72 рядки)
│       ├── 📄 ClusterConnectionsCell.tsx (28 рядків)
│       ├── 📄 ClusterHostCell.tsx (34 рядки)
│       ├── 📄 ClusterLagCell.tsx (42 рядки)
│       ├── 📄 ClusterLocationCell.tsx (26 рядків)
│       ├── 📄 ClusterNameCell.tsx (38 рядків)
│       ├── 📄 ClusterRoleCell.tsx (46 рядків)
│       ├── 📄 ClusterStatusCell.tsx (52 рядки)
│       └── 📄 index.ts (18 рядків)
│
├── 📁 topology-diagram/                     # 6 файлів
│   ├── 📄 ConnectionLines.tsx (94 рядки)
│   ├── 📄 PrimaryNode.tsx (78 рядків)
│   ├── 📄 ReplicaNode.tsx (89 рядків)
│   ├── 📄 ReplicaNodesGrid.tsx (67 рядків)
│   ├── 📄 TopologyDiagram.tsx (134 рядки)
│   └── 📄 index.ts (12 рядків)
│
└── 📁 utils/                                # 9 файлів
    ├── 📄 checkers.ts (58 рядків)
    ├── 📄 filters.ts (67 рядків)
    ├── 📄 formatters.ts (84 рядки)
    ├── 📄 getters.ts (72 рядки)
    ├── 📄 index.ts (19 рядків)
    ├── 📄 parsers.ts (94 рядки)
    ├── 📄 statistics.ts (103 рядки)
    ├── 📄 uiHelpers.ts (76 рядків)
    └── 📄 validators.ts (89 рядків)
```
