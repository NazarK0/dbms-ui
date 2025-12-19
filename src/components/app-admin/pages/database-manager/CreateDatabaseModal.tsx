import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '../../../ui/dialog';
import { databaseDefaults } from '../../../../mockData/admin';
import {
  ModalHeader,
  DatabaseNameInput,
  DatabaseOwnerSelect,
  DatabaseEncodingSelect,
  TemplateSelect,
  CollationSelect,
  AdvancedSettings,
  ModalFooter,
  validateDatabaseName,
  isFormValid,
} from './create-database-modal';

interface CreateDatabaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (params: DatabaseCreationParams) => void;
}

export interface DatabaseCreationParams {
  name: string;
  owner: string;
  encoding: string;
  template: string;
  collation: string;
  tablespace: string;
  connectionLimit: number;
}

export default function CreateDatabaseModal({
  open,
  onOpenChange,
  onCreate,
}: CreateDatabaseModalProps) {
  // Form state
  const [dbName, setDbName] = useState('');
  const [dbOwner, setDbOwner] = useState(databaseDefaults.owner);
  const [encoding, setEncoding] = useState(databaseDefaults.encoding);
  const [template, setTemplate] = useState(databaseDefaults.template);
  const [collation, setCollation] = useState(databaseDefaults.collation);
  const [tablespace, setTablespace] = useState(databaseDefaults.tablespace);
  const [connectionLimit, setConnectionLimit] = useState(databaseDefaults.connectionLimit);

  // Validation state
  const [nameError, setNameError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Validate database name on change
  useEffect(() => {
    if (dbName) {
      const error = validateDatabaseName(dbName);
      setNameError(error);
    } else {
      setNameError(null);
    }
  }, [dbName]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setDbName('');
      setDbOwner(databaseDefaults.owner);
      setEncoding(databaseDefaults.encoding);
      setTemplate(databaseDefaults.template);
      setCollation(databaseDefaults.collation);
      setTablespace(databaseDefaults.tablespace);
      setConnectionLimit(databaseDefaults.connectionLimit);
      setNameError(null);
      setIsCreating(false);
    }
  }, [open]);

  const handleCreate = () => {
    const error = validateDatabaseName(dbName);
    if (error) {
      setNameError(error);
      return;
    }

    setIsCreating(true);

    const params: DatabaseCreationParams = {
      name: dbName,
      owner: dbOwner,
      encoding,
      template,
      collation,
      tablespace,
      connectionLimit,
    };

    // Call onCreate callback if provided
    if (onCreate) {
      onCreate(params);
    }

    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      onOpenChange(false);
    }, 1500);
  };

  const formValid = isFormValid(dbName, dbOwner, nameError);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <ModalHeader />

        <div className="space-y-4 py-4">
          {/* Basic Settings */}
          <div className="space-y-4">
            <DatabaseNameInput
              value={dbName}
              onChange={setDbName}
              error={nameError || undefined}
            />

            <DatabaseOwnerSelect
              value={dbOwner}
              onChange={setDbOwner}
            />

            <TemplateSelect
              value={template}
              onChange={setTemplate}
            />
          </div>

          {/* Encoding & Localization */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-medium text-slate-900 mb-3">
              Кодування та локалізація
            </h3>
            <div className="space-y-4">
              <DatabaseEncodingSelect
                value={encoding}
                onChange={setEncoding}
              />

              <CollationSelect
                value={collation}
                onChange={setCollation}
                encoding={encoding}
              />
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="pt-4 border-t border-slate-200">
            <AdvancedSettings
              tablespace={tablespace}
              onTablespaceChange={setTablespace}
              connectionLimit={connectionLimit}
              onConnectionLimitChange={setConnectionLimit}
            />
          </div>
        </div>

        <ModalFooter
          onCancel={() => onOpenChange(false)}
          onCreate={handleCreate}
          isCreating={isCreating}
          isValid={formValid}
        />
      </DialogContent>
    </Dialog>
  );
}
