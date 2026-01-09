import { AlertTriangle, CircleAlert, CircleCheck, CircleX, Database, Info, LockIcon, LucideIcon, Server, User, UserCog } from 'lucide-react';
import { ColumnConfig, TwoLine } from '../../../../global/table';
import Widget, { ListWidgetData, WidgetType } from '../../../../global/Widget';


interface ActivityLog {
    id: number;
    type: ActivityType;
    category: ActivityCategory;
    title: string;
    details?: string;
    timeAgo: string;
}

interface ActivityTypeIcon {
    Icon: LucideIcon;
    className: string;
}

type ActivityType = 'info' | 'success' | 'warning' | 'error' | 'unknown';
type ActivityCategory = 'db_connection' | 'query_execution' | 'table_modification' | 'user_login' | 'unauthorized_access' | 'system_error';

export default function RecentActivityWidget() {
    const columns: ColumnConfig<ActivityLog> = [
        {
            key: "category",
            header: "",
            width: "60px",
            render: (row) => {
                const { Icon, className } = getCategoryIcon(row.category);
                return (
                    <div className="flex justify-center">
                        <Icon className={`h-5 w-5 ${className}`} />
                    </div>
                );
            },
        },
        {
            key: "type",
            header: "Активність",
            render: (row) => <TwoLine title={row.title} subtitle={row.details} />,
        },
        {
            key: "timeAgo",
            header: "Час",
            render: (row) => <span className="text-muted-foreground">{row.timeAgo}</span>,
        },
        {
            key: "type",
            header: "",
            width: "60px",
            render: (row) => {
                const { Icon, className } = getTypeIcon(row.type);
                return (
                    <div className="flex justify-center">
                        <Icon className={`h-5 w-5 ${className}`} />
                    </div>
                );
            },
        },
    ];

    const data: ActivityLog[] = [
        {
            id: 1,
            type: "info",
            category: "user_login",
            details: "Користувач 'admin' увійшов у систему",
            timeAgo: "5 хвилин тому",
            title: "Вхід до системи",
        },
        {
            id: 2,
            type: "success",
            category: "table_modification",
            details: "Користувач 'user1' створив таблицю 'orders'",
            timeAgo: "15 хвилин тому",
            title: "Створення таблиці",
        },
        {
            id: 3,
            type: "info",
            category: "query_execution",
            details: "Користувач 'user2' виконав запит до таблиці 'customers'",
            timeAgo: "20 хвилин тому",
            title: "Виконання запиту",
        },
        {
            id: 4,
            type: "warning",
            category: "unauthorized_access",
            details: "Користувач 'user3' намагався отримати доступ до забороненої таблиці 'payments'",
            timeAgo: "30 хвилин тому",
            title: "Спроба несанкціонованого доступу",
        },
        {
            id: 5,
            type: "error",
            category: "db_connection",
            details: "Збій підключення до бази даних 'inventory_db'",
            timeAgo: "45 хвилин тому",
            title: "Збій підключення",
        },
        {
            id: 6,
            type: "unknown",
            category: "system_error",
            details: "Невідома активність зафіксована в системі",
            timeAgo: "1 година тому",
            title: "Невідома активність",
        }
    ];

    const url = "activity";

    const widgetData: ListWidgetData = {
        columns: columns as any,
        data,
        url,
        rowClassName: (row) => getActivityColor(row.type),
    };

    const getActivityColor = (type: ActivityType) => {
        switch (type) {
            case "success":
                return "bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-950/30";
            case "warning":
                return "bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/20 dark:hover:bg-yellow-950/30";
            case "error":
                return "bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30";
            case "info":
                return "bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-950/30";
            case "unknown":
                return "bg-gray-50 hover:bg-gray-100 dark:bg-gray-950/20 dark:hover:bg-gray-950/30";
            default: return 'bg-slate-500';
        }
    };

    const getCategoryIcon = (category: ActivityLog["category"]): ActivityTypeIcon => {
        switch (category) {
            case "user_login":
                return { Icon: User, className: "text-blue-600 dark:text-blue-400" };
            case "table_modification":
                return { Icon: Database, className: "text-green-600 dark:text-green-400" };
            case "query_execution":
                return { Icon: Database, className: "text-purple-600 dark:text-purple-400" };
            case "unauthorized_access":
                return { Icon: LockIcon, className: "text-red-600 dark:text-red-400" };
            case "db_connection":
                return { Icon: Server, className: "text-yellow-600 dark:text-yellow-400" };
            case "system_error":
                return { Icon: AlertTriangle, className: "text-orange-600 dark:text-orange-400" };
        }
        return { Icon: UserCog, className: "text-gray-600 dark:text-gray-400" };
    };

    const getTypeIcon = (type: ActivityLog["type"]): ActivityTypeIcon => {
        switch (type) {
            case "success":
                return { Icon: CircleCheck, className: "text-green-600 dark:text-green-400" };
            case "warning":
                return { Icon: CircleAlert, className: "text-yellow-600 dark:text-yellow-400" };
            case "error":
                return { Icon: CircleX, className: "text-red-600 dark:text-red-400" };
            case "info":
                return { Icon: Info, className: "text-blue-600 dark:text-blue-400" };
        }
        return { Icon: UserCog, className: "text-gray-600 dark:text-gray-400" };
    };

    return (
        <Widget
            title="Recent Activity"
            icon={UserCog}
            type={WidgetType.LIST}
            data={widgetData}
        />
    );
}
