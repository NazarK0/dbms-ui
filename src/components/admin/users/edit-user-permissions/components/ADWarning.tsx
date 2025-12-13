import { AlertTriangle } from 'lucide-react';

/**
 * Warning about Active Directory synchronization
 */
export default function ADWarning() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
      <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-blue-900">
        <strong>Примітка:</strong> Користувач синхронізований з Active Directory. Ви можете змінити роль та права доступу в системі, але базова інформація про обліковий запис керується через AD.
      </p>
    </div>
  );
}
