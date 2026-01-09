import { ColumnConfig, Table, TableRows } from '../table';


interface ListWidgetProps {
    columns: ColumnConfig<Record<string, any>>;
    data: TableRows<Record<string, any>>;
    url?: string;
    rowClassName?: (row: Record<string, any>) => string;
}



export default function ListWidget({ columns, data, url, rowClassName }: ListWidgetProps) {
    return (
        <Table
            columns={columns}
            data={data}
            url={url}
            rowClassName={rowClassName}
        />
    );
}
