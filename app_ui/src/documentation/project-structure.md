# 📁 Структура проекту

## Огляд

Проект має модульну архітектуру з чіткою сепарацією Admin та User компонентів, повним набором mock даних для розробки та детальною документацією.

**Загальна кількість файлів:** ~900+ файлів  
**Рядків коду:** ~45,000+ рядків  
**Компонентів:** ~600+ React компонентів

---

## 🌳 Повна структура проекту (Root)

```
/ (Кореневий каталог проекту)
│
├── 📄 App.tsx (62 рядки)                       # Головний компонент додатку
├── 📄 Admin.tsx (98 рядків)                    # Точка входу Admin панелі
├── 📄 User.tsx (10 рядків)                     # Точка входу User панелі
├── 📄 README.md (119 рядків)                   # Головна документація
├── 📄 Attributions.md (3 рядки)                # Атрибуції та ліцензії
│
├── 📁 components/                              # ~700 React компонентів
│   ├── 📁 admin/                               # 🟢 ~500 файлів (Olive тема) → [admin-components.md](./structure/admin-components.md)
│   ├── 📁 user/                                # 🟣 ~90 файлів (Violet тема) → [user-components.md](./structure/user-components.md)
│   ├── 📁 ui/                                  # ⚪ 55 shadcn/ui компонентів
│   ├── 📁 figma/                               # 1 файл
│   │   └── 📄 ImageWithFallback.tsx
│   │
│   ├── 📁 global/                              # 1 файл
│   │   └── 📄 HomePage.tsx
│   │
│   └── 📁 examples/                            # 1 файл
│       └── 📄 LoadingExample.tsx
│
├── 📁 mockData/                                # ~140 файлів тестових даних → [mock-data.md](./structure/mock-data.md)
├── 📁 utils/                                   # 11 файлів утиліт
│   └── 📁 mockApi/                             # Mock API система
│       ├── 📄 index.ts
│       ├── 📄 constants.ts
│       ├── 📄 createMockEndpoint.ts
│       ├── 📄 errors.ts
│       ├── 📄 helpers.ts
│       ├── 📄 mockApiCall.ts
│       ├── 📄 mockApiCallWithFn.ts
│       ├── 📄 mockBatchApiCall.ts
│       ├── 📄 mockDeleteApiCall.ts
│       ├── 📄 mockMutationApiCall.ts
│       ├── 📄 mockPaginatedApiCall.ts
│       └── 📄 mockProgressApiCall.ts
│
├── 📁 styles/                                  # 1 файл стилів
│   └── 📄 globals.css
│
├── 📁 documentation/                           # 20+ файлів документації
│   ├── 📄 overview.md
│   ├── 📄 project-structure.md
│   ├── 📄 tech-stack.md
│   ├── 📄 themes.md
│   ├── 📄 potential-features.md
│   └── 📁 structure/                           
│       ├── 📄 root-files.md                    
│       ├── 📄 admin-components.md              
│       ├── 📄 user-components.md               
│       ├── 📄 mock-data.md                     
│       ├── 📄 other-directories.md             
│       ├── 📄 statistics.md                    
│       ├── 📁 admin/                           
│       │   ├── 📄 dashboard.md                 
│       │   ├── 📄 database-manager.md          
│       │   ├── 📄 database-tools.md            
│       │   ├── 📄 logs.md                     
│       │   ├── 📄 pages.md                     
│       │   ├── 📄 roles.md                     
│       │   ├── 📄 users.md                     
│       │   └── 📁 pages/                      
│       │       ├── 📄 audit-log.md             
│       │       ├── 📄 cli.md                   
│       │       ├── 📄 config.md                
│       │       ├── 📄 dashboard.md             
│       │       ├── 📄 performance.md           
│       │       ├── 📄 replicas.md              
│       │       ├── 📄 system-monitor.md        
│       │       ├── 📄 user-ui-preview.md       
│       │       └── 📄 users-manager.md         
│       └── 📁 user/                            
│
└── 📁 guidelines/                              # 1 файл guidelines
    └── 📄 Guidelines.md
```

---

## 🔗 Зв'язки з іншою документацією

- [Огляд системи](./overview.md)
- [Технологічний стек](./tech-stack.md)
- [Теми та стилізація](./themes.md)
- [Потенційні доповнення](./potential-features.md)

---

**Оновлено:** 16 грудня 2024