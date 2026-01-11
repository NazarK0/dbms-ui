import { ActivityType } from "../types";

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

export default getActivityColor;    