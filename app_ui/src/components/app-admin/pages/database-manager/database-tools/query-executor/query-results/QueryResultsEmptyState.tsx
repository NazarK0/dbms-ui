/**
 * QueryResultsEmptyState Component
 * =================================
 * 
 * Відображає повідомлення коли запит виконано успішно, але не повернув жодного рядка.
 */

export function QueryResultsEmptyState() {
  return (
    <div className="p-8 text-center text-slate-500">
      Запит виконано успішно, але не повернув жодного рядка
    </div>
  );
}
