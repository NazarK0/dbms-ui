import { useSystemLogTableData } from './useSystemLogTableData';
import columns from './columns';
import { getLogLevelColor } from './utils';
import { Table } from '../../../../global/table';
import { SkeletonTable } from '../../../../ui/skeletons';
import LogFilters from './TableFilter';
import { useState } from 'react';

export default function LogTable() {
    const { data, isLoading, error } = useSystemLogTableData();

      const [searchTerm, setSearchTerm] = useState('');
      const [selectedLevel, setSelectedLevel] = useState('all');
      const [selectedSource, setSelectedSource] = useState('all');


    if (isLoading) return <SkeletonTable rows={10} columns={6} showActions />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <LogFilters
                searchTerm={searchTerm}
                selectedLevel={selectedLevel}
                selectedSource={selectedSource}
                onSearchChange={setSearchTerm}
                onLevelChange={setSelectedLevel}
                onSourceChange={setSelectedSource}
            />
            <Table
                title="Записи логів"
                columns={columns}
                data={data!}
                rowClassName={(row) => getLogLevelColor(row.level)}
            />
        </>
    );
}




{/* <Table
    title="Записи логів"
    columns={columns}
    data={data!}
    rowClassName={(row) => getLogLevelColor(row.level)}
/> */}
