import { User, Database, LockIcon, Server, AlertTriangle, UserCog } from "lucide-react";
import { ActivityLog, ActivityTypeIcon } from "../types";

const getCategoryIcon = (category: ActivityLog['category']): ActivityTypeIcon => {
  switch (category) {
    case 'user_login':
      return { Icon: User, className: 'text-blue-600 dark:text-blue-400' };
    case 'table_modification':
      return { Icon: Database, className: 'text-green-600 dark:text-green-400' };
    case 'query_execution':
      return { Icon: Database, className: 'text-purple-600 dark:text-purple-400' };
    case 'unauthorized_access':
      return { Icon: LockIcon, className: 'text-red-600 dark:text-red-400' };
    case 'db_connection':
      return { Icon: Server, className: 'text-yellow-600 dark:text-yellow-400' };
    case 'system_error':
      return { Icon: AlertTriangle, className: 'text-orange-600 dark:text-orange-400' };
  }
  return { Icon: UserCog, className: 'text-gray-600 dark:text-gray-400' };
};  

export default getCategoryIcon;