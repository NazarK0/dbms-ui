/**
 * Create Schema Modal - Schema Owner Select
 * 
 * Dropdown for selecting the schema owner (PostgreSQL role).
 * Loads available owners from mock data (should be fetched from backend in production).
 */

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../ui/select';
import { Label } from '../../../../ui/label';
import { availableSchemaOwners, getSchemaOwnersForDatabase } from '../../../../../mockData/admin/schemaOwners';

interface SchemaOwnerSelectProps {
  value: string;
  onChange: (value: string) => void;
  selectedDatabase: string;
}

export default function SchemaOwnerSelect({ 
  value, 
  onChange, 
  selectedDatabase 
}: SchemaOwnerSelectProps) {
  // In production, this should fetch from backend:
  // const owners = await fetchSchemaOwners(selectedDatabase);
  const owners = getSchemaOwnersForDatabase(selectedDatabase);

  return (
    <div className="space-y-2">
      <Label htmlFor="schema-owner">Власник</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="schema-owner">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {owners.map((owner) => (
            <SelectItem key={owner.value} value={owner.value}>
              {owner.label}
              {owner.roleType && (
                <span className="text-muted-foreground ml-2 text-xs">
                  ({owner.roleType})
                </span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
