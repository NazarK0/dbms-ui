import { Server, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';

export default function TopologyDiagram() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Топологія реплікації</CardTitle>
        <CardDescription>Схема підключень primary та replica серверів</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-8">
          {/* Primary */}
          <div className="w-full max-w-md">
            <div className="bg-gradient-to-br from-lime-50 to-green-50 border-2 border-lime-500 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Server className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-900">Primary Cluster</span>
                </div>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm text-slate-600">
                <p className="font-mono">primary-db.example.com:5432</p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-3 h-3" />
                  <p className="text-xs">US East (Virginia)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="relative w-full max-w-4xl h-16">
            <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-slate-300"></div>
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-300"></div>
            <div className="absolute top-8 left-1/4 w-0.5 h-8 bg-slate-300"></div>
            <div className="absolute top-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
            <div className="absolute top-8 left-3/4 w-0.5 h-8 bg-slate-300"></div>
          </div>

          {/* Replicas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-green-600" />
                  <span className="text-slate-900 text-sm">Replica 1</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-xs text-slate-600">
                <p className="font-mono truncate">replica-1.example.com</p>
                <p className="mt-1">US West • Lag: 12ms</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-green-600" />
                  <span className="text-slate-900 text-sm">Replica 2</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-xs text-slate-600">
                <p className="font-mono truncate">replica-2.example.com</p>
                <p className="mt-1">EU Ireland • Lag: 45ms</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-500 rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-yellow-600" />
                  <span className="text-slate-900 text-sm">Replica 3</span>
                </div>
                <AlertCircle className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="text-xs text-slate-600">
                <p className="font-mono truncate">replica-3.example.com</p>
                <p className="mt-1">AP Singapore • Lag: 234ms</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
