import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/card';

import PrimaryNode from './PrimaryNode';
import ConnectionLines from './ConnectionLines';
import ReplicaNodesGrid from './ReplicaNodesGrid';
import { ClusterServer } from '../types';

interface Props {
    clusters: ClusterServer[];
}

export default function TopologyDiagram({ clusters }: Props) {
    // Separate primary and replicas from clusters data
    const primary = clusters.find(cluster => cluster.role === 'Primary');
    const replicas = clusters.filter(cluster => cluster.role === 'Replica');

    // Fallback if no primary found (shouldn't happen with proper data)
    if (!primary) {
        return (
            <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle>Топологія реплікації</CardTitle>
                    <CardDescription>Схема підключень primary та replica серверів</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-500 text-center py-8">
                        Дані топології недоступні
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader>
                <CardTitle>Топологія реплікації</CardTitle>
                <CardDescription>Схема підключень primary та replica серверів</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col items-center space-y-8">
                    {/* Primary Server */}
                    <PrimaryNode
                        name={primary.name}
                        host={primary.host}
                        port={primary.port}
                        location={primary.location}
                        status={primary.status}
                    />

                    {/* Connection Lines */}
                    <ConnectionLines replicaCount={replicas.length} />

                    {/* Replica Servers Grid */}
                    <ReplicaNodesGrid replicas={replicas} />
                </div>
            </CardContent>
        </Card>
    );
}
