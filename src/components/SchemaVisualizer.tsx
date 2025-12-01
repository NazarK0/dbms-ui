import { useState } from 'react';
import { Search, Download, ZoomIn, ZoomOut, Maximize2, RefreshCw, Database } from 'lucide-react';

export default function SchemaVisualizer({ selectedDatabase }: { selectedDatabase?: string }) {
  const [currentDatabase, setCurrentDatabase] = useState(selectedDatabase || 'production_db');
  const [zoom, setZoom] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');

  const tables = [
    {
      name: 'users',
      schema: 'public',
      columns: [
        { name: 'id', type: 'integer', pk: true, fk: false },
        { name: 'username', type: 'varchar(255)', pk: false, fk: false },
        { name: 'email', type: 'varchar(255)', pk: false, fk: false },
        { name: 'created_at', type: 'timestamp', pk: false, fk: false },
      ],
      position: { x: 50, y: 50 },
    },
    {
      name: 'orders',
      schema: 'public',
      columns: [
        { name: 'id', type: 'integer', pk: true, fk: false },
        { name: 'user_id', type: 'integer', pk: false, fk: true },
        { name: 'total_amount', type: 'decimal(10,2)', pk: false, fk: false },
        { name: 'status', type: 'varchar(50)', pk: false, fk: false },
        { name: 'created_at', type: 'timestamp', pk: false, fk: false },
      ],
      position: { x: 400, y: 50 },
    },
    {
      name: 'order_items',
      schema: 'public',
      columns: [
        { name: 'id', type: 'integer', pk: true, fk: false },
        { name: 'order_id', type: 'integer', pk: false, fk: true },
        { name: 'product_id', type: 'integer', pk: false, fk: true },
        { name: 'quantity', type: 'integer', pk: false, fk: false },
        { name: 'price', type: 'decimal(10,2)', pk: false, fk: false },
      ],
      position: { x: 400, y: 350 },
    },
    {
      name: 'products',
      schema: 'public',
      columns: [
        { name: 'id', type: 'integer', pk: true, fk: false },
        { name: 'name', type: 'varchar(255)', pk: false, fk: false },
        { name: 'description', type: 'text', pk: false, fk: false },
        { name: 'price', type: 'decimal(10,2)', pk: false, fk: false },
        { name: 'stock', type: 'integer', pk: false, fk: false },
      ],
      position: { x: 750, y: 200 },
    },
  ];

  const relations = [
    { from: 'orders', to: 'users', fromColumn: 'user_id', toColumn: 'id' },
    { from: 'order_items', to: 'orders', fromColumn: 'order_id', toColumn: 'id' },
    { from: 'order_items', to: 'products', fromColumn: 'product_id', toColumn: 'id' },
  ];

  const statistics = [
    { table: 'users', rows: 15234, size: '2.4 МБ', indexes: 3 },
    { table: 'orders', rows: 45621, size: '8.7 МБ', indexes: 4 },
    { table: 'order_items', rows: 128453, size: '15.2 МБ', indexes: 5 },
    { table: 'products', rows: 3421, size: '1.8 МБ', indexes: 2 },
  ];

  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Візуалізація схеми бази даних</h2>
          <p className="text-gray-600">Діаграма зв'язків між таблицями та структура даних</p>
        </div>
        <div className="flex items-center gap-3">
          {!selectedDatabase && (
            <select
              value={currentDatabase}
              onChange={(e) => setCurrentDatabase(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="production_db">production_db</option>
              <option value="staging_db">staging_db</option>
              <option value="analytics_db">analytics_db</option>
            </select>
          )}
          {selectedDatabase && (
            <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
              {selectedDatabase}
            </div>
          )}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Оновити
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Експортувати схему
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Пошук таблиць..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Schema Diagram */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-auto" style={{ minHeight: '600px' }}>
        <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left', width: '1200px', height: '800px', position: 'relative' }}>
          {/* SVG for connections */}
          <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
            {relations.map((rel, index) => {
              const fromTable = tables.find((t) => t.name === rel.from);
              const toTable = tables.find((t) => t.name === rel.to);
              if (!fromTable || !toTable) return null;

              const fromX = fromTable.position.x + 150;
              const fromY = fromTable.position.y + 40;
              const toX = toTable.position.x;
              const toY = toTable.position.y + 40;

              return (
                <g key={index}>
                  <line
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              );
            })}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#9CA3AF" />
              </marker>
            </defs>
          </svg>

          {/* Tables */}
          {filteredTables.map((table) => (
            <div
              key={table.name}
              className="absolute bg-white border-2 border-blue-500 rounded-lg shadow-lg"
              style={{
                left: `${table.position.x}px`,
                top: `${table.position.y}px`,
                width: '300px',
              }}
            >
              <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span className="font-mono">{table.name}</span>
              </div>
              <div className="divide-y divide-gray-200">
                {table.columns.map((column) => (
                  <div key={column.name} className="px-4 py-2 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      {column.pk && (
                        <span className="w-2 h-2 bg-yellow-500 rounded-full" title="Primary Key"></span>
                      )}
                      {column.fk && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full" title="Foreign Key"></span>
                      )}
                      <span className="text-sm text-gray-900 font-mono">{column.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{column.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Статистика таблиць</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Таблиця</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Кількість рядків</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Розмір</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Індекси</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {statistics.map((stat) => (
                <tr key={stat.table} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <code className="text-sm text-gray-900">{stat.table}</code>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{stat.rows.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{stat.size}</td>
                  <td className="px-6 py-4 text-gray-600">{stat.indexes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Легенда</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Первинний ключ (Primary Key)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Зовнішній ключ (Foreign Key)</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="40" height="12">
              <line x1="0" y1="6" x2="30" y2="6" stroke="#9CA3AF" strokeWidth="2" />
              <polygon points="30,3 40,6 30,9" fill="#9CA3AF" />
            </svg>
            <span className="text-sm text-gray-600">Зв'язок між таблицями</span>
          </div>
        </div>
      </div>
    </div>
  );
}