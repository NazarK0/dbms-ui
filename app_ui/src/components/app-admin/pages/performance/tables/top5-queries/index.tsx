import { Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../ui/select';
import columns from './columns';
import { useTop5QueriesTableData } from './useTop5QueriesTableData';
import { SkeletonTable } from '../../../../../ui/skeletons';
import { Table } from '../../../../../global/table';


export default function Top5QueriesTable() {
    const { data, isLoading, error } = useTop5QueriesTableData();

    if (isLoading) return <SkeletonTable rows={10} columns={6} showActions />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-slate-700" />
                        <CardTitle>Статистика запитів</CardTitle>
                    </div>
                    <Select value={null} onValueChange={null}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="total_time">За загальним часом</SelectItem>
                            <SelectItem value="avg_time">За середнім часом</SelectItem>
                            <SelectItem value="calls">За кількістю викликів</SelectItem>
                            <SelectItem value="hit_ratio">За коефіцієнтом попадань</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <CardDescription>Детальна статистика виконання SQL запитів</CardDescription>
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
