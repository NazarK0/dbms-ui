import { ReactNode } from "react";
import {
    Table as UITable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { useNavigate } from "@tanstack/react-router";

export interface ColumnConfigRecord<T extends Record<string, any>> {
    key: string;
    header: string;
    render?: (row: T) => ReactNode;
    width?: string;
}

export type ColumnConfig<T extends Record<string, any>> = ColumnConfigRecord<T>[];

export interface TableProps<T extends Record<string, any>> {
    title?: string;
    columns: ColumnConfig<T>;
    data: TableRows<T>;
    url?: string;
    rowClassName?: (row: T) => string;
}

export type TableRows<T extends Record<string, any>> = T[]

export function Table<T extends Record<string, any>>({
    title,
    columns,
    data,
    url,
    rowClassName,
}: TableProps<T>) {
    const navigate = useNavigate();

    return (
        <div>
            {title && (
                <div className="mb-3">
                    <h2 className="font-medium">{title}</h2>
                </div>
            )}
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
                                className={`${url ? "cursor-pointer" : ""} ${rowClassName?.(row) || ""}`}
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

export { default as TwoLine } from './TwoLine';