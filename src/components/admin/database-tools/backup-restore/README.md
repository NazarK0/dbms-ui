# Backup & Restore Components

This directory contains modular components for PostgreSQL backup and restore operations.

## 📁 Component Structure

### Main Components

- **`BackupHeader.tsx`** - Header with database name and create backup button
- **`BackupProgress.tsx`** - Progress indicator for backup creation
- **`BackupActions.tsx`** - Action buttons for individual backups (download, restore)
- **`BackupsTable.tsx`** - Table displaying all backups

### Restore Components

- **`RestoreUpload.tsx`** - File upload area for restore operations
- **`RestoreWarning.tsx`** - Warning alert about data replacement

### Schedule Components

- **`ScheduleHeader.tsx`** - Header for schedule management
- **`ScheduleActions.tsx`** - Action buttons for schedules (enable/disable, edit)
- **`SchedulesTable.tsx`** - Table displaying backup schedules

### Utilities

- **`utils.ts`** - Helper functions (format options, type colors)
- **`index.ts`** - Central export file

## 🔧 Usage

```tsx
import BackupRestore from './BackupRestore';

// In your component
<BackupRestore selectedDatabase="production" />
```

## 🎯 Features

### Backups Tab
- ✅ Create manual backups
- ✅ View backup history
- ✅ Download backup files
- ✅ Restore from backups
- ✅ Real-time progress tracking

### Restore Tab
- ✅ Upload backup files
- ✅ Support multiple formats (SQL, Custom, TAR, Directory)
- ✅ Warning alerts for data safety

### Schedule Tab
- ✅ Automated backup schedules
- ✅ Configurable frequency (hourly, daily, weekly, monthly)
- ✅ Retention policies
- ✅ Enable/disable schedules

## 📊 Component Hierarchy

```
BackupRestore (Parent)
├── Tabs
│   ├── Backups Tab
│   │   ├── BackupHeader
│   │   ├── BackupProgress (conditional)
│   │   └── BackupsTable
│   │       └── BackupActions
│   ├── Restore Tab
│   │   ├── RestoreUpload
│   │   └── RestoreWarning
│   └── Schedule Tab
│       ├── ScheduleHeader
│       └── SchedulesTable
│           └── ScheduleActions
```

## 🔄 Data Flow

1. Parent component manages state (backup progress, modals)
2. Child components emit events via callbacks
3. Mock data imported from centralized location
4. Utility functions provide consistent formatting

## 🚀 Future Enhancements

- Add point-in-time recovery (PITR)
- Implement differential backups
- Add backup encryption options
- Support cloud storage integration (S3, GCS, Azure)
- Add backup verification/testing
- Implement backup compression settings
- Add notification system for scheduled backups
