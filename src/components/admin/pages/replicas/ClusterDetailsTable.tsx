import { Server, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import type { ClusterServer } from './types';
import { getStatusText, getLagVariant } from './utils';

interface ClusterDetailsTableProps {
  clusters: ClusterServer[];
  onSelectCluster?: (clusterId: number) => void;
  onConfigureCluster?: (clusterId: number) => void;
  onPromoteReplica?: (clusterId: number) => void;
}

export default function ClusterDetailsTable({
  clusters,
  onSelectCluster,
  onConfigureCluster,
  onPromoteReplica,
}: ClusterDetailsTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Деталі кластерів</CardTitle>
        <CardDescription>Інформація про всі сервери в топології</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Назва</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Локація</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>З'єднання</TableHead>
              <TableHead>Затримка репл.</TableHead>
              <TableHead className="text-right">Дії</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clusters.map((cluster) => (
              <TableRow 
                key={cluster.id} 
                className="cursor-pointer" 
                onClick={() => onSelectCluster?.(cluster.id)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-900">{cluster.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={cluster.role === 'Primary' ? 'default' : 'secondary'}>
                    {cluster.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {cluster.status === 'healthy' ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-600 text-sm">{getStatusText(cluster.status)}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-yellow-600 text-sm">{getStatusText(cluster.status)}</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-600 text-sm">{cluster.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                    {cluster.host}:{cluster.port}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{cluster.connections}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getLagVariant(cluster.replicationLag)}>
                    {cluster.replicationLag}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onConfigureCluster?.(cluster.id);
                      }}
                    >
                      Налаштувати
                    </Button>
                    {cluster.role !== 'Primary' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-green-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPromoteReplica?.(cluster.id);
                        }}
                      >
                        Promote
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
