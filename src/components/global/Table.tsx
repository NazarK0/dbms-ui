import { ReactNode } from "react";
import {
    Table as UITable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { useNavigate } from "@tanstack/react-router";

export interface ColumnConfig<T> {
    key: string;
    header: string;
    render?: (row: T) => ReactNode;
    width?: string;
}

export interface TableProps<T> {
    columns: ColumnConfig<T>[];
    data: T[];
    url?: string;
}

export function Table<T extends Record<string, any>>({
    columns,
    data,
    url,
}: TableProps<T>) {
    const navigate = useNavigate();
    
    return (
        <div>
            <div className="mb-3">
                <h2 className="font-medium">{title}</h2>
            </div>
            <div className="rounded-lg border bg-card">
                <UITable>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableHead key={index} style={{ width: column.width }}>
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                onClick={url ? () => navigate({
                                    to: `/${url}/${row.id}`,
                                    replace: true,
                                }) : undefined}
                                className={url ? "cursor-pointer" : ""}
                            >
                                {columns.map((column, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {column.render ? column.render(row) : row[column.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </UITable>
            </div>
        </div>
    );
}

// Helper component for two-line cells
interface TwoLineProps {
    title: string;
    subtitle?: string;
}

export function TwoLine({ title, subtitle }: TwoLineProps) {
    return (
        <div>
            <div className="font-medium">{title}</div>
            {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
        </div>
    );
}
