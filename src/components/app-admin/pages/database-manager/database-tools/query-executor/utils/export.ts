/**
 * Data Export Utilities
 * ======================
 * 
 * Функції для експорту результатів запитів у різні формати.
 */

import { QueryResult } from '../types';

/**
 * Експортує результати запиту в CSV формат
 * 
 * @param result - Результат виконання запиту
 * @returns CSV рядок з headers та rows
 * 
 * @example
 * ```typescript
 * const result = {
 *   columns: ['id', 'name', 'email'],
 *   rows: [
 *     ['1', 'John Doe', 'john@example.com'],
 *     ['2', 'Jane Smith', 'jane@example.com']
 *   ]
 * };
 * 
 * const csv = exportToCSV(result);
 * // "id,name,email
 * //  1,John Doe,john@example.com
 * //  2,Jane Smith,jane@example.com"
 * ```
 */
export function exportToCSV(result: QueryResult): string {
  const headers = result.columns.join(',');
  const rows = result.rows.map(row => {
    // Екрануємо коми та лапки в значеннях
    return row.map(cell => {
      const value = String(cell ?? '');
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',');
  }).join('\n');
  
  return `${headers}\n${rows}`;
}

/**
 * Експортує результати запиту в JSON формат
 * 
 * @param result - Результат виконання запиту
 * @returns JSON рядок (pretty-printed)
 * 
 * @example
 * ```typescript
 * const result = {
 *   columns: ['id', 'name'],
 *   rows: [['1', 'John'], ['2', 'Jane']]
 * };
 * 
 * const json = exportToJSON(result);
 * // [
 * //   { "id": "1", "name": "John" },
 * //   { "id": "2", "name": "Jane" }
 * // ]
 * ```
 */
export function exportToJSON(result: QueryResult): string {
  const data = result.rows.map(row => {
    const obj: any = {};
    result.columns.forEach((col, index) => {
      obj[col] = row[index];
    });
    return obj;
  });
  
  return JSON.stringify(data, null, 2);
}

/**
 * Експортує результати запиту в SQL INSERT формат
 * 
 * @param result - Результат виконання запиту
 * @param tableName - Назва таблиці для INSERT statements
 * @returns SQL рядок з INSERT statements
 * 
 * @example
 * ```typescript
 * const result = {
 *   columns: ['id', 'name'],
 *   rows: [['1', 'John'], ['2', 'Jane']]
 * };
 * 
 * const sql = exportToSQL(result, 'users');
 * // INSERT INTO users (id, name) VALUES ('1', 'John');
 * // INSERT INTO users (id, name) VALUES ('2', 'Jane');
 * ```
 */
export function exportToSQL(result: QueryResult, tableName: string): string {
  const columns = result.columns.join(', ');
  
  const inserts = result.rows.map(row => {
    const values = row.map(cell => {
      if (cell === null || cell === undefined) {
        return 'NULL';
      }
      if (typeof cell === 'number') {
        return String(cell);
      }
      // Екрануємо одинарні лапки для SQL
      const escaped = String(cell).replace(/'/g, "''");
      return `'${escaped}'`;
    }).join(', ');
    
    return `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
  }).join('\n');
  
  return inserts;
}

/**
 * Експортує результати запиту в XML формат
 * 
 * @param result - Результат виконання запиту
 * @returns XML рядок
 * 
 * @example
 * ```typescript
 * const result = {
 *   columns: ['id', 'name'],
 *   rows: [['1', 'John'], ['2', 'Jane']]
 * };
 * 
 * const xml = exportToXML(result);
 * // <?xml version="1.0" encoding="UTF-8"?>
 * // <rows>
 * //   <row>
 * //     <id>1</id>
 * //     <name>John</name>
 * //   </row>
 * //   ...
 * // </rows>
 * ```
 */
export function exportToXML(result: QueryResult): string {
  const rows = result.rows.map(row => {
    const fields = result.columns.map((col, index) => {
      const value = row[index] ?? '';
      // Екрануємо XML спецсимволи
      const escaped = String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
      return `    <${col}>${escaped}</${col}>`;
    }).join('\n');
    
    return `  <row>\n${fields}\n  </row>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n${rows}\n</rows>`;
}

/**
 * Завантажує файл на комп'ютер користувача
 * 
 * @param content - Вміст файлу (текст)
 * @param filename - Назва файлу для збереження
 * @param mimeType - MIME тип файлу (за замовчуванням 'text/plain')
 * 
 * @example
 * ```typescript
 * const csv = exportToCSV(result);
 * downloadFile(csv, 'users.csv', 'text/csv');
 * 
 * const json = exportToJSON(result);
 * downloadFile(json, 'users.json', 'application/json');
 * ```
 */
export function downloadFile(
  content: string, 
  filename: string, 
  mimeType: string = 'text/plain'
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Типи файлів для експорту
 */
export type ExportFormat = 'csv' | 'json' | 'sql' | 'xml';

/**
 * MIME типи для різних форматів
 */
export const EXPORT_MIME_TYPES: Record<ExportFormat, string> = {
  csv: 'text/csv',
  json: 'application/json',
  sql: 'text/plain',
  xml: 'application/xml',
};

/**
 * Експортує результати в заданому форматі та завантажує файл
 * 
 * @param result - Результат виконання запиту
 * @param format - Формат експорту ('csv', 'json', 'sql', 'xml')
 * @param filename - Назва файлу (без розширення)
 * @param tableName - Назва таблиці (тільки для SQL формату)
 * 
 * @example
 * ```typescript
 * exportAndDownload(result, 'csv', 'users');
 * exportAndDownload(result, 'json', 'users_backup');
 * exportAndDownload(result, 'sql', 'users_data', 'users');
 * ```
 */
export function exportAndDownload(
  result: QueryResult,
  format: ExportFormat,
  filename: string,
  tableName?: string
): void {
  let content: string;
  
  switch (format) {
    case 'csv':
      content = exportToCSV(result);
      break;
    case 'json':
      content = exportToJSON(result);
      break;
    case 'sql':
      if (!tableName) {
        throw new Error('Table name is required for SQL export');
      }
      content = exportToSQL(result, tableName);
      break;
    case 'xml':
      content = exportToXML(result);
      break;
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
  
  const mimeType = EXPORT_MIME_TYPES[format];
  const fullFilename = `${filename}.${format}`;
  
  downloadFile(content, fullFilename, mimeType);
}
