/**
 * Create Schema Modal
 * 
 * Main modal component for creating PostgreSQL schemas.
 * Allows configuration of schema name, owner, and description.
 * 
 * Features:
 * - Schema name input with validation
 * - Owner selection (database roles)
 * - Optional description (stored as COMMENT)
 * - Automatic validation and sanitization
 * 
 * The modal is split into modular subcomponents for better maintainability.
 * 
 * @see /components/admin/database-tools/schemas/create-schema-modal/README.md
 */

import { useState } from 'react';
import { Dialog, DialogContent } from '../../../../../../ui/dialog';
import { getDefaultSchemaOwner } from '../../../../../../../mockData/admin/schemaOwners';
import ModalHeader from './ModalHeader';
import SchemaNameInput from './SchemaNameInput';
import SchemaOwnerSelect from './SchemaOwnerSelect';
import SchemaDescriptionTextarea from './SchemaDescriptionTextarea';
import PermissionsInfoAlert from './PermissionsInfoAlert';
import ModalFooter from './ModalFooter';
import { CreateSchemaModalProps, SchemaFormData, DEFAULT_FORM_VALUES } from './types';
import { sanitizeFormData, validateSchemaForm } from './utils';

/**
 * CreateSchemaModal Component
 * 
 * @param open - Controls modal visibility
 * @param onOpenChange - Callback when modal open state changes
 * @param onSubmit - Callback when form is submitted with valid data
 * @param selectedDatabase - Database context for the schema
 */
export default function CreateSchemaModal({
  open,
  onOpenChange,
  onSubmit,
  selectedDatabase
}: CreateSchemaModalProps) {
  // Form state
  const [schemaName, setSchemaName] = useState(DEFAULT_FORM_VALUES.schemaName);
  const [schemaOwner, setSchemaOwner] = useState(() => getDefaultSchemaOwner(selectedDatabase));
  const [schemaDescription, setSchemaDescription] = useState(DEFAULT_FORM_VALUES.schemaDescription);

  /**
   * Reset form to default values
   */
  const resetForm = () => {
    setSchemaName(DEFAULT_FORM_VALUES.schemaName);
    setSchemaOwner(getDefaultSchemaOwner(selectedDatabase));
    setSchemaDescription(DEFAULT_FORM_VALUES.schemaDescription);
  };

  /**
   * Handle form submission
   * Validates and sanitizes data before calling onSubmit callback
   */
  const handleSubmit = () => {
    const formData: SchemaFormData = {
      schemaName,
      schemaOwner,
      schemaDescription,
    };

    if (validateSchemaForm(formData)) {
      const sanitizedData = sanitizeFormData(formData);
      onSubmit(sanitizedData);
      resetForm();
    }
  };

  /**
   * Handle modal close
   * Resets form and calls onOpenChange callback
   */
  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  // Determine if submit button should be disabled
  const isSubmitDisabled = !schemaName.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <ModalHeader selectedDatabase={selectedDatabase} />

        <div className="space-y-4 py-4">
          {/* Schema name */}
          <SchemaNameInput
            value={schemaName}
            onChange={setSchemaName}
          />

          {/* Schema owner */}
          <SchemaOwnerSelect
            value={schemaOwner}
            onChange={setSchemaOwner}
            selectedDatabase={selectedDatabase}
          />

          {/* Optional description */}
          <SchemaDescriptionTextarea
            value={schemaDescription}
            onChange={setSchemaDescription}
          />

          {/* Information alert */}
          <PermissionsInfoAlert />
        </div>

        <ModalFooter
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          isSubmitDisabled={isSubmitDisabled}
        />
      </DialogContent>
    </Dialog>
  );
}

// Re-export types for external use
export type { SchemaFormData, CreateSchemaModalProps };