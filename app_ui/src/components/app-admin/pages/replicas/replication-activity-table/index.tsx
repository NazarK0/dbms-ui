import { Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { Table } from '../../../../global/table';
import columns from './columns';
import { SkeletonTable } from '../../../../ui/skeletons';
import { useReplicationActivityData } from './useReplicationActivityData';


export default function ReplicationActivityTable() {
    const { data, isLoading, error } = useReplicationActivityData();
    
    if (isLoading) return <SkeletonTable rows={10} columns={6} showActions />;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-slate-700" />
                    <CardTitle>Активність реплікації</CardTitle>
                </div>
                <CardDescription>Поточний стан потокової реплікації</CardDescription>
            </CardHeader>
            <CardContent>
                <Table
                    columns={columns}
                    data={data!}
                />
                
            </CardContent>
        </Card>
    );
}
