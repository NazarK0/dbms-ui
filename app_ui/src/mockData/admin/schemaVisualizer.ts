// Schema Visualizer Mock Data

export interface TableColumn {
  name: string;
  type: string;
  pk?: boolean;
  fk?: boolean;
}

export interface TableDefinition {
  name: string;
  owner?: string;
  columns: TableColumn[];
  position: { x: number; y: number };
}

export interface TableStatistic {
  table: string;
  owner?: string;
  rows: number;
  size: string;
  indexes: number;
}

export const schemaVisualizerTables: TableDefinition[] = [
  {
    name: 'users',
    owner: 'admin',
    columns: [
      { name: 'id', type: 'integer', pk: true },
      { name: 'username', type: 'varchar(255)' },
      { name: 'email', type: 'varchar(255)' },
      { name: 'created_at', type: 'timestamp' },
    ],
    position: { x: 50, y: 50 },
  },
  {
    name: 'orders',
    owner: 'admin',
    columns: [
      { name: 'id', type: 'integer', pk: true },
      { name: 'user_id', type: 'integer', fk: true },
      { name: 'total_amount', type: 'decimal' },
      { name: 'status', type: 'varchar(50)' },
    ],
    position: { x: 450, y: 50 },
  },
  {
    name: 'products',
    columns: [
      { name: 'id', type: 'integer', pk: true },
      { name: 'name', type: 'varchar(255)' },
      { name: 'price', type: 'decimal' },
    ],
    position: { x: 250, y: 300 },
  },
  {
    name: 'order_items',
    columns: [
      { name: 'id', type: 'integer', pk: true },
      { name: 'order_id', type: 'integer', fk: true },
      { name: 'product_id', type: 'integer', fk: true },
      { name: 'quantity', type: 'integer' },
      { name: 'price', type: 'decimal' },
    ],
    position: { x: 450, y: 300 },
  },
];

export const schemaStatistics: TableStatistic[] = [
  { table: 'users', owner: 'admin', rows: 15234, size: '2.4 МБ', indexes: 3 },
  { table: 'orders', owner: 'admin', rows: 45621, size: '8.7 МБ', indexes: 4 },
  { table: 'order_items', rows: 128453, size: '15.2 МБ', indexes: 5 },
  { table: 'products', rows: 3421, size: '1.8 МБ', indexes: 2 },
];

// Connection lines for the diagram (from x1,y1 to x2,y2)
export interface Connection {
  from: string;
  to: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export const schemaConnections: Connection[] = [
  { from: 'users', to: 'orders', fromX: 200, fromY: 150, toX: 450, toY: 150 },
  { from: 'orders', to: 'order_items', fromX: 550, fromY: 200, toX: 550, toY: 300 },
  { from: 'products', to: 'order_items', fromX: 350, fromY: 350, toX: 450, toY: 350 },
];