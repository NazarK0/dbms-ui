import { AlertCircle } from 'lucide-react';

export default function RestoreWarning() {
  return (
    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="flex gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-yellow-900 mb-1">Увага</h4>
          <p className="text-yellow-700 text-sm">
            Відновлення замінить всі поточні дані в базі даних. Переконайтеся, що ви створили резервну копію перед відновленням.
          </p>
        </div>
      </div>
    </div>
  );
}
