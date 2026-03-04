/**
 * Preview Mode Selector
 * Allows admin to choose between User ID mode and Manual Configuration mode
 */

import { Card, CardContent } from '../../../../ui/card';
import { User, Settings } from 'lucide-react';

export type PreviewMode = 'user' | 'manual';

interface PreviewModeSelectorProps {
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
}

export default function PreviewModeSelector({
  mode,
  onModeChange,
}: PreviewModeSelectorProps) {
  return (
    <Card className="border-slate-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-1">
              Режим попереднього перегляду
            </h4>
            <p className="text-xs text-slate-500">
              Оберіть спосіб налаштування preview користувацького інтерфейсу
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* User ID Mode */}
            <button
              onClick={() => onModeChange('user')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                mode === 'user'
                  ? 'border-violet-500 bg-violet-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    mode === 'user' ? 'bg-violet-100' : 'bg-slate-100'
                  }`}
                >
                  <User
                    className={`h-5 w-5 ${
                      mode === 'user' ? 'text-violet-600' : 'text-slate-600'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-slate-900 mb-1">
                    За ID користувача
                  </div>
                  <div className="text-xs text-slate-600">
                    Введіть ID або ім'я користувача для завантаження реальних ролей та дозволів
                  </div>
                </div>
              </div>
            </button>

            {/* Manual Configuration Mode */}
            <button
              onClick={() => onModeChange('manual')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                mode === 'manual'
                  ? 'border-violet-500 bg-violet-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    mode === 'manual' ? 'bg-violet-100' : 'bg-slate-100'
                  }`}
                >
                  <Settings
                    className={`h-5 w-5 ${
                      mode === 'manual' ? 'text-violet-600' : 'text-slate-600'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-slate-900 mb-1">
                    Ручна конфігурація
                  </div>
                  <div className="text-xs text-slate-600">
                    Оберіть ролі вручну та налаштуйте дозволи і RLS правила
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
