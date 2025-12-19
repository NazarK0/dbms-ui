/**
 * ReplicaLocationField Component
 * 
 * Select field for replica geographic location.
 * 
 * @module form-fields/ReplicaLocationField
 */

import { Label } from '../../../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../ui/select';
import { getAvailableLocations } from '../../utils/getters';

interface ReplicaLocationFieldProps {
  /**
   * Current location value
   */
  value: string;
  
  /**
   * Change handler
   */
  onChange: (value: string) => void;
}

/**
 * Location select field for replica configuration
 * 
 * Displays available geographic locations for replica deployment.
 * 
 * @example
 * ```tsx
 * <ReplicaLocationField
 *   value={formData.location}
 *   onChange={(value) => updateField('location', value)}
 * />
 * ```
 */
export default function ReplicaLocationField({ value, onChange }: ReplicaLocationFieldProps) {
  const locations = getAvailableLocations();

  return (
    <div className="space-y-2">
      <Label htmlFor="location">Локація</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="location">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location.value} value={location.value}>
              {location.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}