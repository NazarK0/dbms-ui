import { CircleAlert, CircleCheck, CircleX, Info, UserCog } from "lucide-react";
import { ActivityLog, ActivityTypeIcon } from "../types";

const getTypeIcon = (type: ActivityLog['type']): ActivityTypeIcon => {
  switch (type) {
    case 'success':
      return { Icon: CircleCheck, className: 'text-green-600 dark:text-green-400' };
    case 'warning':
      return { Icon: CircleAlert, className: 'text-yellow-600 dark:text-yellow-400' };
    case 'error':
      return { Icon: CircleX, className: 'text-red-600 dark:text-red-400' };
    case 'info':
      return { Icon: Info, className: 'text-blue-600 dark:text-blue-400' };
  }
  return { Icon: UserCog, className: 'text-gray-600 dark:text-gray-400' };
};
export default getTypeIcon;