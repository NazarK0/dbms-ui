import { useNavigate } from '@tanstack/react-router';
import { ColumnConfig, Table } from '../Table';


interface ListWidgetProps<T> {
    columns: ColumnConfig<T>[];
    data: T[];
    title: string;
    url?: string;
}

export default function ListWidget<T extends Record<string, any>>({
    columns,
    data,
    title,
    url,
}: ListWidgetProps<T>) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="mb-3">
                <h2 className="font-medium">{title}</h2>
            </div>
            <Table
                columns={columns}
                data={data}
                url={url}
            />
        </div>
    );
}








































