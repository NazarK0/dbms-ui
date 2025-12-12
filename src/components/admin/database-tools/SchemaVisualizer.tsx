import { useState } from 'react';
import { Network, Download, ZoomIn, ZoomOut, Maximize2, Database, Key, Link2, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';

export default function SchemaVisualizer({ selectedDatabase }: { selectedDatabase?: string }) {
  const [zoom, setZoom] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');

  const tables = [
    {
      name: 'users',
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
  ];

  const statistics = [
    { table: 'users', rows: 15234, size: '2.4 МБ', indexes: 3 },
    { table: 'orders', rows: 45621, size: '8.7 МБ', indexes: 4 },
    { table: 'order_items', rows: 128453, size: '15.2 МБ', indexes: 5 },
    { table: 'products', rows: 3421, size: '1.8 МБ', indexes: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Пошук таблиць..."
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Масштаб: {zoom}%</Badge>
              <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(200, zoom + 10))}>
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Експорт
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schema Diagram */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-slate-700" />
            <CardTitle>Діаграма схеми БД</CardTitle>
          </div>
          <CardDescription>База даних: {selectedDatabase}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 p-8 min-h-[500px] relative overflow-hidden">
            <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
              <div className="relative">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <line x1="200" y1="150" x2="450" y2="150" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="550" y1="200" x2="350" y2="350" stroke="#94a3b8" strokeWidth="2" />
                </svg>

                {/* Tables */}
                {tables.map((table) => (
                  <div
                    key={table.name}
                    className="absolute bg-white rounded-lg border-2 border-slate-300 shadow-lg"
                    style={{ left: `${table.position.x}px`, top: `${table.position.y}px`, width: '250px', zIndex: 1 }}
                  >
                    <div className="bg-gradient-to-r from-lime-600 to-green-600 text-white px-4 py-3 rounded-t-lg">
                      <h4 className="font-medium">{table.name}</h4>
                    </div>
                    <div className="p-3 space-y-1">
                      {table.columns.map((col, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm py-1">
                          {col.pk && <Badge variant="default" className="text-xs px-1.5 py-0">PK</Badge>}
                          {col.fk && <Badge variant="secondary" className="text-xs px-1.5 py-0">FK</Badge>}
                          <span className="text-slate-900 font-mono">{col.name}</span>
                          <span className="text-slate-500 text-xs ml-auto">{col.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Статистика таблиць</CardTitle>
          <CardDescription>Розмір та кількість записів</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statistics.map((stat) => (
              <div key={stat.table} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <h4 className="text-slate-900 font-medium mb-3">{stat.table}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Рядків:</span>
                    <Badge variant="secondary">{stat.rows.toLocaleString()}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Розмір:</span>
                    <Badge variant="outline">{stat.size}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Індекси:</span>
                    <Badge variant="outline">{stat.indexes}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}