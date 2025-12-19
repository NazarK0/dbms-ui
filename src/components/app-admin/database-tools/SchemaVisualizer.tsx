import { useState } from 'react';
import { Network, Download, ZoomIn, ZoomOut, Maximize2, Database, Key, Link2, Search, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { useAdminUser } from '../../../contexts/AdminUserContext';
import { 
  schemaVisualizerTables, 
  schemaStatistics, 
  schemaConnections,
  type TableDefinition,
  type TableStatistic,
  type Connection
} from '@/mockData/admin/schemaVisualizer';

interface SchemaVisualizerProps {
  selectedDatabase?: string;
}

export default function SchemaVisualizer({ selectedDatabase }: SchemaVisualizerProps) {
  const { user } = useAdminUser();
  const [zoom, setZoom] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');

  const tables: TableDefinition[] = schemaVisualizerTables;
  const statistics: TableStatistic[] = schemaStatistics;

  // Filter tables based on search term
  const filteredTables = tables.filter(table => 
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter statistics to match visible tables
  const filteredStatistics = statistics.filter(stat =>
    filteredTables.some(table => table.name === stat.table)
  );
  
  // Check if admin is owner of a table
  const isOwner = (owner?: string) => {
    return owner === 'admin' || 
           (user.permissions.ownedDatabases.includes('*'));
  };

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
                  {schemaConnections.map((conn, idx) => (
                    <line
                      key={idx}
                      x1={conn.fromX}
                      y1={conn.fromY}
                      x2={conn.toX}
                      y2={conn.toY}
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />
                  ))}
                </svg>

                {/* Tables */}
                {filteredTables.map((table) => (
                  <div
                    key={table.name}
                    className="absolute bg-white rounded-lg border-2 border-slate-300 shadow-lg"
                    style={{ left: `${table.position.x}px`, top: `${table.position.y}px`, width: '250px', zIndex: 1 }}
                  >
                    <div className="bg-gradient-to-r from-lime-600 to-green-600 text-white px-4 py-3 rounded-t-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{table.name}</h4>
                        {isOwner(table.owner) && (
                          <Crown className="w-4 h-4 text-yellow-300" title="Ви власник цієї таблиці" />
                        )}
                      </div>
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
            {filteredStatistics.map((stat) => (
              <div key={stat.table} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-slate-900 font-medium">{stat.table}</h4>
                  {isOwner(stat.owner) && (
                    <Crown className="w-4 h-4 text-olive-600" title="Ви власник цієї таблиці" />
                  )}
                </div>
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