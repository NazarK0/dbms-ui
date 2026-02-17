export interface ReplicaActivityEntry {
  replica: string;
  state: string;
  syncState: string;
  sentLSN: string;
  writeLSN: string;
  flushLSN: string;
  lag: string;
}
