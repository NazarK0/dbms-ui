/**
 * Generator functions for CLI commands and output
 */

import type { CommandHistory, CommandStatus } from '../types';

/**
 * Generate mock output for a command
 */
export const generateMockOutput = (cmd: string): string => {
  const lower = cmd.toLowerCase();

  if (lower.startsWith('\\l')) {
    return `                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
-----------+----------+----------+-------------+-------------+-----------------------
 postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 production| postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 staging   | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
(3 rows)`;
  }

  if (lower.startsWith('\\dt')) {
    return `                List of relations
 Schema |     Name      | Type  |  Owner   
--------+---------------+-------+----------
 public | users         | table | postgres
 public | orders        | table | postgres
 public | products      | table | postgres
 public | categories    | table | postgres
(4 rows)`;
  }

  if (lower.startsWith('\\du')) {
    return `                                   List of roles
 Role name |                         Attributes                         | Member of 
-----------+------------------------------------------------------------+-----------
 admin     | Superuser, Create role, Create DB                          | {}
 developer | Create DB                                                  | {}
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 readonly  |                                                            | {}`;
  }

  if (lower.includes('select version()')) {
    return `                                                 version                                                  
----------------------------------------------------------------------------------------------------------
 PostgreSQL 16.1 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 13.2.0, 64-bit
(1 row)`;
  }

  if (lower.includes('select current_database()')) {
    return ` current_database 
------------------
 production
(1 row)`;
  }

  if (lower.startsWith('select')) {
    return `Query executed successfully.
(${Math.floor(Math.random() * 100) + 1} rows affected)`;
  }

  if (lower.startsWith('insert') || lower.startsWith('update') || lower.startsWith('delete')) {
    const rows = Math.floor(Math.random() * 10) + 1;
    return `${lower.split(' ')[0].toUpperCase()} ${rows}`;
  }

  if (lower.startsWith('create')) {
    return 'CREATE TABLE';
  }

  if (lower.startsWith('\\x')) {
    return 'Expanded display is on.';
  }

  return `Command executed: ${cmd}
OK`;
};

/**
 * Execute a command and create history entry
 */
export const executeCommand = (
  command: string,
  includeError: boolean = false
): CommandHistory => {
  const trimmedCommand = command.trim();
  const timestamp = new Date().toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const executionTime = Math.floor(Math.random() * 50) + 1 + 'ms';
  const status: CommandStatus = includeError || trimmedCommand.toLowerCase().includes('error')
    ? 'error'
    : 'success';

  return {
    id: Date.now().toString(),
    command: trimmedCommand,
    output: generateMockOutput(trimmedCommand),
    timestamp,
    status,
    executionTime,
  };
};
