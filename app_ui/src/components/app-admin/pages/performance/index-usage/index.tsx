import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { Table } from '../../../../global/table';
import columns from './columns';
import { useIndexUsageTableData } from './useIndexUsageTableData';
import { SkeletonTable } from '../../../../ui/skeletons';

export default function IndexUsageTable() {
    const { data, isLoading, error } = useIndexUsageTableData();

    if (isLoading) return <SkeletonTable rows={10} columns={6} showActions />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader>
                <CardTitle>Використання індексів</CardTitle>
                <CardDescription>Статистика використання індексів таблиць</CardDescription>
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
