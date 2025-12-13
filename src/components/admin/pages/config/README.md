# PostgreSQL Configuration Components

Модульні компоненти для управління налаштуваннями PostgreSQL сервера з редагуванням postgresql.conf, профілями конфігурацій та швидкими пресетами.

## 📁 Структура

```
config/
├── ConfigHeader.tsx            # Header з кнопкою перезапуску
├── RestartDialog.tsx           # Діалог підтвердження перезапуску
├── RestartAlert.tsx            # Alert про параметри що потребують restart
├── ConfigStatistics.tsx        # 3 карточки статистики
├── ConfigAccordion.tsx         # Accordion з категоріями параметрів
├── ConfigPreview.tsx           # Попередній перегляд postgresql.conf
├── ProfilesManager.tsx         # Керування профілями
├── SaveProfileDialog.tsx       # Діалог збереження профілю
├── ImportDialog.tsx            # Діалог імпорту з файлу
├── QuickPresets.tsx            # Швидкі пресети
├── types.ts                    # TypeScript інтерфейси
├── data.ts                     # Mock дані конфігурації
├── utils.ts                    # Допоміжні функції (17 functions)
├── index.ts                    # Центральний експорт
└── README.md                   # Ця документація
```

## 🧩 Компоненти

### ConfigHeader
Header з назвою та кнопкою перезапуску сервера.

**Props:**
```typescript
interface ConfigHeaderProps {
  restartDialogOpen: boolean;
  onRestartDialogChange: (open: boolean) => void;
  onRestart?: () => void;
}
```

**Використання:**
```tsx
<ConfigHeader
  restartDialogOpen={restartDialogOpen}
  onRestartDialogChange={setRestartDialogOpen}
  onRestart={handleRestart}
/>
```

**Особливості:**
- Назва "Конфігурація PostgreSQL"
- Опис функціоналу
- Червона кнопка "Перезапустити сервер"
- Інтегрований RestartDialog

---

### RestartDialog
Діалог підтвердження перезапуску сервера з анімацією.

**Props:**
```typescript
interface RestartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestart?: () => void;
}
```

**Використання:**
```tsx
<RestartDialog
  open={restartDialogOpen}
  onOpenChange={setRestartDialogOpen}
  onRestart={handleRestart}
/>
```

**Особливості:**
- Іконка Power в червоному колі
- Попередження про переривання підключень
- Анімація при перезапуску (3 секунди)
- Пульсуючий індикатор прогресу
- Disabled кнопки під час рестарту

**Процес:**
```
1. User натискає "Перезапустити сервер"
   ↓
2. Діалог показує попередження
   ↓
3. User підтверджує
   ↓
4. Анімація "Перезапуск сервера..." (3s)
   ↓
5. Діалог закривається, callback виконується
```

---

### RestartAlert
Жовтий alert про параметри, що вимагають перезапуску.

**Props:**
```typescript
interface RestartAlertProps {
  count: number;
}
```

**Використання:**
```tsx
<RestartAlert count={statistics.requiresRestart} />
```

**Особливості:**
- Автоматично ховається якщо `count === 0`
- Жовтий фон з іконкою AlertTriangle
- Показує кількість параметрів

---

### ConfigStatistics
Сітка з 3 карточками статистики конфігурації.

**Props:**
```typescript
interface ConfigStatisticsProps {
  statistics: ConfigStatistics;
}

interface ConfigStatistics {
  totalParams: number;
  changed: number;
  requiresRestart: number;
}
```

**Використання:**
```tsx
const statistics = calculateStatistics(configParams);

<ConfigStatistics statistics={statistics} />
```

**Карточки:**

1. **Всього параметрів**
   - Іконка: Settings
   - Градієнт: lime → green
   - Badge з кількістю

2. **Змінених**
   - Іконка: CheckCircle
   - Градієнт: yellow → lime
   - Badge з кількістю змінених

3. **Потрібен restart**
   - Іконка: RotateCcw
   - Градієнт: yellow → orange
   - Жовтий outline badge

**Layout:** 3-колонкова сітка (responsive: 1/3)

---

### ConfigAccordion
Основний компонент з категоріями параметрів у вигляді accordion.

**Props:**
```typescript
interface ConfigAccordionProps {
  params: ConfigParam[];
  hasChanges: boolean;
  onParamChange?: (paramName: string, value: string) => void;
  onSave?: () => void;
  onReset?: () => void;
}

interface ConfigParam {
  name: string;
  value: string;
  defaultValue: string;
  unit?: string;
  description: string;
  requiresRestart: boolean;
  category: string;
}
```

**Використання:**
```tsx
<ConfigAccordion
  params={configParams}
  hasChanges={hasChanges}
  onParamChange={handleParamChange}
  onSave={handleSave}
  onReset={handleReset}
/>
```

**Категорії (6):**

| Category | Icon | Name | Color |
|----------|------|------|-------|
| `memory` | HardDrive | Пам'ять | lime → green |
| `connections` | Network | Підключення | green → lime |
| `wal` | Database | WAL | yellow → lime |
| `autovacuum` | Zap | Autovacuum | lime → yellow |
| `logging` | FileText | Логування | green → lime |
| `performance` | Cpu | Продуктивність | lime → green |

**Таблиця параметрів (5 колонок):**

1. **Параметр** - Назва (monospace)
2. **Поточне значення** - Input для редагування
3. **За замовчуванням** - Badge з default значенням
4. **Опис** - Текстовий опис
5. **Restart** - Badge (Так/Ні)

**Особливості:**
- Multiple accordion (можна відкрити кілька категорій)
- Lime фон для змінених параметрів
- Input onChange → callback `onParamChange`
- Кнопки "Скинути" та "Зберегти зміни"
- "Зберегти зміни" disabled якщо `hasChanges === false`

---

### ConfigPreview
Попередній перегляд згенерованого файлу postgresql.conf.

**Props:**
```typescript
interface ConfigPreviewProps {
  params: ConfigParam[];
  onExport?: () => void;
}
```

**Використання:**
```tsx
<ConfigPreview params={configParams} onExport={handleExport} />
```

**Особливості:**
- Темний фон (slate-900)
- Зелений текст (green-400) - термінальний стиль
- Monospace шрифт
- Автоматична генерація через `generateConfigFile()`
- Кнопка "Завантажити файл"
- Default export через `exportConfigAsFile()`

**Формат файлу:**
```conf
# PostgreSQL Configuration File
# Generated by PostgreSQL DBMS Admin Panel
# Date: 2025-12-13

#------------------------------------------------------------------------------
# MEMORY SETTINGS
#------------------------------------------------------------------------------
shared_buffers = 256MB
work_mem = 8MB
...
```

---

### ProfilesManager
Керування збереженими профілями конфігурацій.

**Props:**
```typescript
interface ProfilesManagerProps {
  profiles: ConfigProfile[];
  saveDialogOpen: boolean;
  importDialogOpen: boolean;
  parametersCount: number;
  onSaveDialogChange: (open: boolean) => void;
  onImportDialogChange: (open: boolean) => void;
  onSaveProfile?: (name: string, description: string) => void;
  onImportFile?: (file: File) => void;
  onApplyProfile?: (profileId: string) => void;
  onDownloadProfile?: (profileId: string) => void;
  onDeleteProfile?: (profileId: string) => void;
}

interface ConfigProfile {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  parametersCount: number;
}
```

**Використання:**
```tsx
<ProfilesManager
  profiles={profiles}
  saveDialogOpen={saveDialogOpen}
  importDialogOpen={importDialogOpen}
  parametersCount={statistics.totalParams}
  onSaveDialogChange={setSaveDialogOpen}
  onImportDialogChange={setImportDialogOpen}
  onSaveProfile={handleSaveProfile}
  onImportFile={handleImportFile}
  onApplyProfile={handleApplyProfile}
  onDownloadProfile={handleDownloadProfile}
  onDeleteProfile={handleDeleteProfile}
/>
```

**Кнопки header:**
- "Імпорт з файлу" → відкриває ImportDialog
- "Зберегти профіль" → відкриває SaveProfileDialog

**Структура профілю:**
```
┌─────────────────────────────────────────────────────┐
│ 📁 Production Optimized                             │
│    Оптимізовано для продакшн серверів               │
│    ⚙ 22 параметрів | Створено: 2024-12-10 15:30    │
│              [Завантажити] [Застосувати] [🗑]       │
└─────────────────────────────────────────────────────┘
```

**Кнопки профілю:**
- **Завантажити** (Download) - експорт у JSON/conf
- **Застосувати** (FolderOpen) - застосувати профіль
- **Видалити** (Trash2) - червона кнопка

**Empty state:**
- Іконка FolderOpen
- Текст "Немає збережених профілів"
- Кнопка "Створити перший профіль"

---

### SaveProfileDialog
Діалог збереження поточної конфігурації як профілю.

**Props:**
```typescript
interface SaveProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parametersCount: number;
  onSave?: (name: string, description: string) => void;
}
```

**Використання:**
```tsx
<SaveProfileDialog
  open={saveDialogOpen}
  onOpenChange={setSaveDialogOpen}
  parametersCount={22}
  onSave={handleSaveProfile}
/>
```

**Поля:**
1. **Назва профілю** (обов'язкове) - Input
2. **Опис** (необов'язкове) - Input

**Blue alert:**
- CheckCircle іконка
- "Буде збережено **22** параметрів з поточної конфігурації"

**Validation:**
- Кнопка "Зберегти профіль" disabled якщо назва порожня

---

### ImportDialog
Діалог імпорту налаштувань з JSON або .conf файлу.

**Props:**
```typescript
interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport?: (file: File) => void;
}
```

**Використання:**
```tsx
<ImportDialog
  open={importDialogOpen}
  onOpenChange={setImportDialogOpen}
  onImport={handleImportFile}
/>
```

**Особливості:**
- Dashed border drop zone
- Upload іконка
- Текст "Перетягніть файл сюди або клацніть для вибору"
- Підтримка .json та .conf файлів
- File input з `accept=".json,.conf"`
- Автоматичне закриття після вибору файлу

---

### QuickPresets
Швидкі пресети конфігурації для різних сценаріїв.

**Props:**
```typescript
interface QuickPresetsProps {
  onApplyPreset?: (presetType: 'development' | 'production' | 'highload') => void;
}
```

**Використання:**
```tsx
<QuickPresets onApplyPreset={handleApplyPreset} />
```

**Пресети (3):**

1. **Розробка** (Development)
   - Іконка: Cpu
   - Градієнт: green → lime
   - Мінімальне споживання ресурсів, детальне логування

2. **Продакшн** (Production)
   - Іконка: Database
   - Градієнт: yellow → lime
   - Оптимізація для продуктивності та стабільності

3. **Висока навантаження** (High Load)
   - Іконка: Zap
   - Градієнт: lime → green
   - Максимальна продуктивність для великих навантажень

**Layout:** 3-колонкова сітка (responsive: 1/3)

---

## 🛠️ Утиліти (utils.ts)

### getCategoryIcon
Повертає іконку для категорії.

```typescript
getCategoryIcon(category: string): typeof Icon
```

**Приклад:**
```tsx
const Icon = getCategoryIcon('memory'); // HardDrive
<Icon className="w-5 h-5" />
```

---

### getCategoryName
Повертає українську назву категорії.

```typescript
getCategoryName(category: string): string
```

**Приклад:**
```tsx
getCategoryName('memory');       // "Пам'ять"
getCategoryName('connections');  // "Підключення"
getCategoryName('wal');          // "WAL"
```

---

### getCategoryColor
Повертає gradient класи для категорії.

```typescript
getCategoryColor(category: string): string
```

**Приклад:**
```tsx
const color = getCategoryColor('memory'); // "from-lime-500 to-green-600"
<div className={`bg-gradient-to-br ${color}`}>...</div>
```

---

### calculateStatistics
Обчислює статистику конфігурації.

```typescript
calculateStatistics(params: ConfigParam[]): ConfigStatistics
```

**Приклад:**
```tsx
const stats = calculateStatistics(configParams);
// {
//   totalParams: 22,
//   changed: 8,
//   requiresRestart: 3
// }
```

---

### getCategories
Повертає унікальні категорії з параметрів.

```typescript
getCategories(params: ConfigParam[]): string[]
```

**Приклад:**
```tsx
const categories = getCategories(configParams);
// ['memory', 'connections', 'wal', 'autovacuum', 'logging', 'performance']
```

---

### getParamsByCategory
Фільтрує параметри за категорією.

```typescript
getParamsByCategory(params: ConfigParam[], category: string): ConfigParam[]
```

**Приклад:**
```tsx
const memoryParams = getParamsByCategory(configParams, 'memory');
// [{ name: 'shared_buffers', ... }, { name: 'work_mem', ... }, ...]
```

---

### generateConfigFile
Генерує вміст postgresql.conf файлу.

```typescript
generateConfigFile(params: ConfigParam[]): string
```

**Приклад:**
```tsx
const content = generateConfigFile(configParams);
// Returns formatted .conf file content with categories
```

**Формат виводу:**
```conf
# PostgreSQL Configuration File
# Generated by PostgreSQL DBMS Admin Panel
# Date: 2025-12-13

#------------------------------------------------------------------------------
# MEMORY SETTINGS
#------------------------------------------------------------------------------
shared_buffers = 256MB
work_mem = 8MB
...
```

---

### exportConfigAsJSON
Експортує конфігурацію у JSON файл.

```typescript
exportConfigAsJSON(params: ConfigParam[], profileName?: string): void
```

**Приклад:**
```tsx
<Button onClick={() => exportConfigAsJSON(configParams, 'Production')}>
  Експорт JSON
</Button>
```

**JSON структура:**
```json
{
  "name": "Production",
  "generatedAt": "2025-12-13T12:00:00.000Z",
  "parameters": {
    "shared_buffers": "256MB",
    "work_mem": "8MB",
    ...
  }
}
```

---

### exportConfigAsFile
Експортує конфігурацію у .conf файл.

```typescript
exportConfigAsFile(params: ConfigParam[]): void
```

**Приклад:**
```tsx
<Button onClick={() => exportConfigAsFile(configParams)}>
  Завантажити .conf
</Button>
```

**Файл:** `postgresql-{timestamp}.conf`

---

### validateParamValue
Валідує значення параметра.

```typescript
validateParamValue(param: ConfigParam, value: string): {
  valid: boolean;
  error?: string;
}
```

**Приклад:**
```tsx
const result = validateParamValue(param, '256MB');
if (!result.valid) {
  console.error(result.error);
}
```

**Валідації:**
- Перевірка на порожнє значення
- Формат числових значень з unit
- Boolean значення ('on'/'off')

---

### parseConfigFile
Парсить вміст .conf файлу у об'єкт.

```typescript
parseConfigFile(content: string): Record<string, string>
```

**Приклад:**
```tsx
const content = `
shared_buffers = 256MB
# Comment line
work_mem = 8MB
`;
const config = parseConfigFile(content);
// { shared_buffers: '256MB', work_mem: '8MB' }
```

**Особливості:**
- Ігнорує коментарі (# ...)
- Ігнорує порожні рядки
- Trimming значень

---

### isParamModified
Перевіряє чи параметр було змінено.

```typescript
isParamModified(param: ConfigParam): boolean
```

**Приклад:**
```tsx
if (isParamModified(param)) {
  // Highlight row
}
```

---

### getPresetConfig
Повертає налаштування для пресету.

```typescript
getPresetConfig(presetType: 'development' | 'production' | 'highload'): Record<string, string>
```

**Приклад:**
```tsx
const devConfig = getPresetConfig('development');
// {
//   shared_buffers: '128MB',
//   work_mem: '4MB',
//   max_connections: '50',
//   ...
// }
```

**Пресети:**
- **development** - Мінімальні ресурси, максимальне логування
- **production** - Збалансовані налаштування
- **highload** - Максимальна продуктивність

---

### compareConfigs
Порівнює дві конфігурації.

```typescript
compareConfigs(
  config1: Record<string, string>,
  config2: Record<string, string>
): {
  same: string[];
  different: string[];
  onlyInFirst: string[];
  onlyInSecond: string[];
}
```

**Приклад:**
```tsx
const comparison = compareConfigs(currentConfig, savedConfig);
console.log(`Changed: ${comparison.different.length}`);
```

---

### formatFileSize
Форматує розмір файлу.

```typescript
formatFileSize(bytes: number): string
```

**Приклад:**
```tsx
formatFileSize(1024);           // "1.00 KB"
formatFileSize(1048576);        // "1.00 MB"
formatFileSize(1073741824);     // "1.00 GB"
```

---

### estimateMemoryUsage
Оцінює використання пам'яті з конфігурації.

```typescript
estimateMemoryUsage(params: ConfigParam[]): number
```

**Приклад:**
```tsx
const memoryMB = estimateMemoryUsage(configParams);
console.log(`Estimated memory: ${memoryMB}MB`);
```

**Враховує:**
- shared_buffers
- work_mem
- maintenance_work_mem
- effective_cache_size

---

## 📦 Імпорт

### Компоненти
```typescript
import {
  ConfigHeader,
  RestartDialog,
  RestartAlert,
  ConfigStatistics,
  ConfigAccordion,
  ConfigPreview,
  ProfilesManager,
  SaveProfileDialog,
  ImportDialog,
  QuickPresets,
} from './config';
```

### Types
```typescript
import type {
  ConfigParam,
  ConfigProfile,
  ConfigStatistics,
  ConfigCategory,
  QuickPreset,
} from './config';
```

### Utils
```typescript
import {
  getCategoryIcon,
  getCategoryName,
  getCategoryColor,
  calculateStatistics,
  generateConfigFile,
  exportConfigAsJSON,
  exportConfigAsFile,
} from './config';
```

### Data
```typescript
import { configParams, savedProfiles } from './config/data';
```

---

## 🎨 Повний приклад

```typescript
import { useState } from 'react';
import {
  ConfigHeader,
  RestartAlert,
  ConfigStatistics,
  ConfigAccordion,
  ConfigPreview,
  ProfilesManager,
  QuickPresets,
  calculateStatistics,
} from './config';
import { configParams, savedProfiles as initialProfiles } from './config/data';

export default function PostgresConfig() {
  const [hasChanges, setHasChanges] = useState(false);
  const [restartDialogOpen, setRestartDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [profiles, setProfiles] = useState(initialProfiles);

  const statistics = calculateStatistics(configParams);

  return (
    <div className="space-y-6">
      <ConfigHeader
        restartDialogOpen={restartDialogOpen}
        onRestartDialogChange={setRestartDialogOpen}
        onRestart={() => console.log('Restarted')}
      />

      <RestartAlert count={statistics.requiresRestart} />

      <ConfigStatistics statistics={statistics} />

      <ConfigAccordion
        params={configParams}
        hasChanges={hasChanges}
        onParamChange={(name, value) => setHasChanges(true)}
        onSave={() => setHasChanges(false)}
        onReset={() => setHasChanges(false)}
      />

      <ConfigPreview params={configParams} />

      <ProfilesManager
        profiles={profiles}
        saveDialogOpen={saveDialogOpen}
        importDialogOpen={importDialogOpen}
        parametersCount={statistics.totalParams}
        onSaveDialogChange={setSaveDialogOpen}
        onImportDialogChange={setImportDialogOpen}
      />

      <QuickPresets onApplyPreset={(type) => console.log(type)} />
    </div>
  );
}
```

---

## 🎯 Особливості

### PostgreSQL Configuration Management
- **22 параметри** в 6 категоріях
- Редагування в реальному часі
- Підсвітка змінених параметрів
- Індикатори restart required

### Profile System
- Збереження конфігурацій як профілів
- Імпорт/експорт JSON та .conf файлів
- Швидке застосування профілів
- Управління (download, apply, delete)

### Quick Presets
- Development - мінімальні ресурси
- Production - збалансовані налаштування
- High Load - максимальна продуктивність

### File Generation
- Автоматична генерація postgresql.conf
- Terminal-style preview (dark theme)
- Експорт у .conf або JSON
- Structured by categories

---

## 🔄 Інтеграція з API

### Приклад реальної інтеграції

```typescript
const PostgresConfig = () => {
  const [params, setParams] = useState<ConfigParam[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch current configuration
  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/postgres/config');
      const data = await response.json();
      setParams(data);
    } catch (error) {
      console.error('Failed to fetch config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await fetch('/api/postgres/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ params }),
      });
      // Success notification
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  };

  const handleRestart = async () => {
    try {
      await fetch('/api/postgres/restart', { method: 'POST' });
      // Wait for restart and poll status
    } catch (error) {
      console.error('Failed to restart:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return <ConfigAccordion params={params} onSave={handleSave} />;
};
```

---

## 📊 Метрики

- **Компонентів:** 10
- **Утиліт:** 17
- **Загальний розмір:** ~900 рядків коду
- **Середній розмір компонента:** ~90 рядків
- **Покриття TypeScript:** 100%
- **Параметрів у mock data:** 22
- **Категорій:** 6

---

## 🔗 Пов'язані модулі

- [PerformanceAnalyzer](../performance/README.md) - Аналіз продуктивності
- [SystemMonitor](../SystemMonitor.tsx) - Системний моніторинг
- [DatabaseOverview](../../DatabaseOverview.tsx) - Огляд БД

---

**Останнє оновлення:** 13 грудня 2025  
**Версія:** 1.0.0  
**Статус:** ✅ Готово до використання
