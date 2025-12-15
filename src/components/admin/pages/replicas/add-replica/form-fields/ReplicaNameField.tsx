/**
 * ReplicaNameField Component
 * 
 * Input field for replica cluster name.
 * 
 * @module form-fields/ReplicaNameField
 */

import { Input } from '../../../../../ui/input';
import { Label } from '../../../../../ui/label';

interface ReplicaNameFieldProps {
  /**
   * Current name value
   */
  value: string;
  
  /**
   * Change handler
   */
  onChange: (value: string) => void;
}

/**
 * Name input field for replica configuration
 * 
 * @example
 * ```tsx
 * <ReplicaNameField
 *   value={formData.name}
 *   onChange={(value) => updateField('name', value)}
 * />
 * ```
 */
export default function ReplicaNameField({ value, onChange }: ReplicaNameFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="replica-name">Назва репліки</Label>
      <Input 
        id="replica-name" 
        placeholder="Read Replica 4" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
