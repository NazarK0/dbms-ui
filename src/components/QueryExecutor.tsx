import { useState } from 'react';
import { Play, Save, Clock, Database } from 'lucide-react';

export default function QueryExecutor() {
  const [query, setQuery] = useState('SELECT * FROM users LIMIT 10;');
  const [selectedDatabase, setSelectedDatabase] = useState('production_db');
  const [results, setResults] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const queryHistory = [
    { query: 'SELECT COUNT(*) FROM orders WHERE status = \'completed\'', time: '10:45 AM', duration: '12ms' },
    { query: 'UPDATE users SET last_login = NOW() WHERE id = 123', time: '10:32 AM', duration: '8ms' },
    { query: 'INSERT INTO logs (message, level) VALUES (\'Test\', \'INFO\')', time: '10:15 AM', duration: '5ms' },
    { query: 'CREATE TABLE analytics (id SERIAL PRIMARY KEY, data JSONB)', time: '09:58 AM', duration: '145ms' },
  ];

  const sampleResults = {
    columns: ['id', 'username', 'email', 'created_at', 'status'],
    rows: [
      [1, 'john_doe', 'john@example.com', '2024-01-15 10:30:00', 'active'],
      [2, 'jane_smith', 'jane@example.com', '2024-01-16 14:22:00', 'active'],
      [3, 'bob_wilson', 'bob@example.com', '2024-01-17 09:15:00', 'inactive'],
      [4, 'alice_brown', 'alice@example.com', '2024-01-18 16:45:00', 'active'],
      [5, 'charlie_davis', 'charlie@example.com', '2024-01-19 11:20:00', 'active'],
    ],
    rowCount: 5,
    executionTime: '15ms',
  };

  const handleExecuteQuery = () => {
    setIsExecuting(true);
    // Simulate query execution
    setTimeout(() => {
      setResults(sampleResults);
      setIsExecuting(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">SQL Query Editor</h2>
          <p className="text-gray-600">Execute SQL queries directly on your databases</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedDatabase}
            onChange={(e) => setSelectedDatabase(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="production_db">production_db</option>
            <option value="staging_db">staging_db</option>
            <option value="analytics_db">analytics_db</option>
            <option value="test_db">test_db</option>
          </select>
        </div>
      </div>

      {/* Query Editor */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-gray-600" />
            <span className="text-gray-900 text-sm">Query Editor</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-200 rounded transition-colors">
              <Save className="w-4 h-4" />
              <span className="text-sm">Save</span>
            </button>
            <button
              onClick={handleExecuteQuery}
              disabled={isExecuting}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm">{isExecuting ? 'Executing...' : 'Execute'}</span>
            </button>
          </div>
        </div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-48 p-4 font-mono text-sm border-0 focus:outline-none resize-none"
          placeholder="Enter your SQL query here..."
        />
      </div>

      {/* Results */}
      {results && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <span className="text-gray-900 text-sm">Query Results</span>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{results.rowCount} rows returned</span>
              <span>•</span>
              <span>Execution time: {results.executionTime}</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {results.columns.map((col: string) => (
                    <th key={col} className="px-4 py-3 text-left text-gray-700 text-sm">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.rows.map((row: any[], index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-3 text-gray-600 text-sm">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Query History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-700" />
          <h3 className="text-gray-900">Query History</h3>
        </div>
        <div className="space-y-3">
          {queryHistory.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => setQuery(item.query)}
            >
              <div className="flex-1">
                <code className="text-sm text-gray-900 block">{item.query}</code>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{item.time}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{item.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
