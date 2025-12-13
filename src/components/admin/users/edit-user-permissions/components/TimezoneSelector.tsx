import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from '../../../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../ui/select';
import { commonTimezones, allTimezones } from '../../../../../mockData/admin';
import { getButtonGradient, getInputBorderClasses, getInfoBoxClasses, getInfoBoxTextClasses, getIconColorClasses } from '../utils/themeUtils';
import type { TimezoneSelectorProps } from '../types';

/**
 * Timezone selection component with common/all modes
 */
export default function TimezoneSelector({
  selectedTimezone,
  onTimezoneChange,
  userType,
  themeColor,
}: TimezoneSelectorProps) {
  const [timezoneSearchMode, setTimezoneSearchMode] = useState<'common' | 'all'>('common');

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Clock className={`w-5 h-5 ${getIconColorClasses(userType)}`} />
        <div>
          <h4 className="text-slate-900">Часовий пояс</h4>
          <p className="text-sm text-slate-600">
            Налаштування часового поясу для відображення дати та часу
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2 mb-2">
          <Button
            type="button"
            variant={timezoneSearchMode === 'common' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimezoneSearchMode('common')}
            className={timezoneSearchMode === 'common' ? `bg-gradient-to-r ${getButtonGradient(userType)}` : ''}
          >
            Поширені
          </Button>
          <Button
            type="button"
            variant={timezoneSearchMode === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimezoneSearchMode('all')}
            className={timezoneSearchMode === 'all' ? `bg-gradient-to-r ${getButtonGradient(userType)}` : ''}
          >
            Всі часові пояси
          </Button>
        </div>

        <Select value={selectedTimezone} onValueChange={onTimezoneChange}>
          <SelectTrigger className={`w-full ${getInputBorderClasses(userType, !!selectedTimezone)}`}>
            <SelectValue placeholder="Оберіть часовий пояс..." />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {(timezoneSearchMode === 'common' ? commonTimezones : allTimezones).map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedTimezone && (
          <div className={`rounded-lg p-3 border ${getInfoBoxClasses(userType)}`}>
            <p className={`text-sm ${getInfoBoxTextClasses(userType)}`}>
              <strong>Поточний час:</strong> {new Date().toLocaleString('uk-UA', { timeZone: selectedTimezone })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
