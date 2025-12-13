# Foreign Servers Manager Components

This directory contains modular components for managing PostgreSQL Foreign Data Wrappers (FDW) and external database connections.

## 📁 Component Structure

### Main Components

- **`ServersHeader.tsx`** - Header with title and add server button
- **`ServersSearchBar.tsx`** - Search input for filtering servers
- **`ServersInfoAlert.tsx`** - Information alert about FDW functionality
- **`FDWNotInstalledAlert.tsx`** - Alert when FDW extension is not installed

### Table Components

- **`ServersTable.tsx`** - Table displaying foreign servers
- **`ServerActions.tsx`** - Action buttons (test connection, edit, delete)

### Modal Components

- **`CreateServerModal.tsx`** - Modal for adding new foreign servers

### Utilities

- **`utils.ts`** - Helper functions (status badges, wrapper options, default ports)
- **`index.ts`** - Central export file

## 🔧 Usage

```tsx
import ForeignServersManager from './ForeignServersManager';

// In your component
<ForeignServersManager selectedDatabase="production" />
```

## 🎯 Features

### Server Management
- ✅ Add foreign servers with various FDW types
- ✅ Test server connections
- ✅ Edit server configurations
- ✅ Delete servers with confirmation
- ✅ Search/filter servers

### Supported FDW Types
- **postgres_fdw** - PostgreSQL databases
- **mysql_fdw** - MySQL databases
- **oracle_fdw** - Oracle databases
- **mongodb_fdw** - MongoDB databases
- **multicorn** - Custom API/data sources
- **file_fdw** - CSV/text files

### Connection Status
- 🟢 **Connected** - Server is accessible
- ⚪ **Disconnected** - Server not connected
- 🔴 **Error** - Connection failed

## 📊 Component Hierarchy

```
ForeignServersManager (Parent)
├── FDWNotInstalledAlert (conditional)
└── Card
    ├── ServersHeader
    ├── ServersSearchBar
    ├── ServersInfoAlert
    ├── ServersTable
    │   └── ServerActions
    └── CreateServerModal
```

## 🔄 Data Flow

1. Parent component manages state (search query, modals)
2. Checks if FDW extension is installed
3. Filters servers based on search query
4. Child components emit events via callbacks
5. Mock data imported from centralized location

## 🚀 Future Enhancements

- Add EditServerModal for modifying configurations
- Implement user mapping management
- Add foreign table browser
- Support connection pooling settings
- Add server health monitoring
- Implement connection retry logic
- Add SSL/TLS configuration options
- Support connection string templates
- Add import schema wizard
- Implement query cost estimation for foreign tables

## 🔐 Security Notes

- User credentials should be stored securely
- Use USER MAPPING for authentication
- Consider connection encryption (SSL/TLS)
- Implement role-based access control for foreign servers
- Audit foreign data access
