import { useAuditLogTableData } from './useAuditLogTableData';
import columns from './columns';
import { getTableRowClass } from './utils';
import { Table } from '../../../../global/table';
import { SkeletonTable } from '../../../../ui/skeletons';
import { useState } from 'react';
import TableFilters from './filters';
import type { AuditFilters as AuditFiltersType } from './filters/types';
import { filterAuditEntries } from './filters/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { Button } from '../../../../ui/button';
import { Download } from 'lucide-react';


export default function LogTable() {
    const { data :logs, isLoading, error } = useAuditLogTableData();

    const [filters, setFilters] = useState<AuditFiltersType>({
            searchQuery: '',
            filterUser: 'all',
            filterAction: 'all',
            filterCategory: 'all',
        });

    
        const handleFiltersChange = (newFilters: Partial<AuditFiltersType>) => {
            setFilters((prev) => ({ ...prev, ...newFilters }));
        };
    
        const filteredEntries = filterAuditEntries(
            logs || [],
            filters.searchQuery,
            filters.filterUser,
            filters.filterAction,
            filters.filterCategory
        );
    
        const handleExport = () => {
            console.log('Export audit log');
        };
    


    if (isLoading) return <SkeletonTable rows={10} columns={6} showActions />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Історія всіх дій</CardTitle>
                            <CardDescription>Повний аудит лог операцій в системі</CardDescription>
                        </div>
                        <Button variant="outline" onClick={handleExport}>
                            <Download className="w-4 h-4 mr-2" />
                            Експорт
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <TableFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        totalEntries={logs!.length}
                        filteredCount={filteredEntries.length}
                    />
                    <Table
                        columns={columns}
                        data={logs!}
                        rowClassName={(row) => getTableRowClass(row.status)}
                    />
                    </div>
                </CardContent>
            </Card>

    );
}
