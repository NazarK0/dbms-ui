export interface QueryStatEntry {
  query: string;
  calls: number;
  totalTime: string;
  avgTime: string;
  minTime: string;
  maxTime: string;
  rows: number;
  hitRatio: number;
}
