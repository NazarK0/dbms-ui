export interface IndexUsageEntry {
  database: string;
  schema: string;
  table: string;
  index: string;
  size: string;
  scans: number;
  rowsRead: number;
  usage: number;
}
