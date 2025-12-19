/**
 * Create Foreign Server Modal - Wrapper Type Select
 * 
 * Dropdown for selecting the Foreign Data Wrapper (FDW) type.
 * Different wrapper types support different database systems (PostgreSQL, MySQL, MongoDB, etc.).
 */

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../../ui/select';
import { Label } from '../../../../../../ui/label';
import { getWrapperOptions } from '../utils';

interface WrapperTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function WrapperTypeSelect({ value, onChange }: WrapperTypeSelectProps) {
  const wrapperOptions = getWrapperOptions();

  return (
    <div className="space-y-2">
      <Label htmlFor="wrapper-type">Foreign Data Wrapper</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="wrapper-type">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {wrapperOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
