/**
 * Create Foreign Server Modal
 * 
 * Main modal component for creating foreign servers in PostgreSQL.
 * Allows configuration of Foreign Data Wrappers (FDW) to connect to external databases.
 * 
 * Features:
 * - Server name configuration
 * - FDW type selection (postgres_fdw, mysql_fdw, mongo_fdw, etc.)
 * - Connection settings (host, port)
 * - Remote database name
 * - Optional default username
 * - Auto port detection based on FDW type
 * 
 * The modal is split into modular subcomponents for better maintainability.
 * 
 * @see /components/admin/database-tools/foreign-servers/create-server-modal/README.md
 */

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '../../../../../../ui/dialog';
import { getDefaultPort } from '../utils';
import ModalHeader from './ModalHeader';
import ServerNameInput from './ServerNameInput';
import WrapperTypeSelect from './WrapperTypeSelect';
import ConnectionSettings from './ConnectionSettings';
import DatabaseNameInput from './DatabaseNameInput';
import UsernameInput from './UsernameInput';
import UserMappingInfoAlert from './UserMappingInfoAlert';
import ModalFooter from './ModalFooter';
import { CreateServerModalProps, ServerFormData, DEFAULT_FORM_VALUES } from './types';
import { sanitizeFormData, validateServerForm } from './utils';

/**
 * CreateServerModal Component
 * 
 * @param open - Controls modal visibility
 * @param onOpenChange - Callback when modal open state changes
 * @param onSubmit - Callback when form is submitted with valid data
 */
export default function CreateServerModal({ open, onOpenChange, onSubmit }: CreateServerModalProps) {
  // Form state
  const [serverName, setServerName] = useState(DEFAULT_FORM_VALUES.serverName);
  const [wrapperType, setWrapperType] = useState(DEFAULT_FORM_VALUES.wrapperType);
  const [host, setHost] = useState(DEFAULT_FORM_VALUES.host);
  const [port, setPort] = useState(DEFAULT_FORM_VALUES.port);
  const [dbname, setDbname] = useState(DEFAULT_FORM_VALUES.dbname);
  const [username, setUsername] = useState(DEFAULT_FORM_VALUES.username);

  /**
   * Auto-update port when wrapper type changes
   * Different database systems use different default ports
   */
  useEffect(() => {
    setPort(getDefaultPort(wrapperType));
  }, [wrapperType]);

  /**
   * Reset form to default values
   */
  const resetForm = () => {
    setServerName(DEFAULT_FORM_VALUES.serverName);
    setWrapperType(DEFAULT_FORM_VALUES.wrapperType);
    setHost(DEFAULT_FORM_VALUES.host);
    setPort(DEFAULT_FORM_VALUES.port);
    setDbname(DEFAULT_FORM_VALUES.dbname);
    setUsername(DEFAULT_FORM_VALUES.username);
  };

  /**
   * Handle form submission
   * Validates and sanitizes data before calling onSubmit callback
   */
  const handleSubmit = () => {
    const formData: ServerFormData = {
      serverName,
      wrapperType,
      host,
      port,
      dbname,
      username,
    };

    if (validateServerForm(formData)) {
      const sanitizedData = sanitizeFormData(formData);
      onSubmit(sanitizedData);
      resetForm();
    }
  };

  /**
   * Handle modal close
   * Resets form and calls onOpenChange callback
   */
  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  // Determine if submit button should be disabled
  const isSubmitDisabled = !serverName.trim() || !host.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <ModalHeader />

        <div className="space-y-4 py-4">
          {/* Server identification */}
          <div className="grid grid-cols-2 gap-4">
            <ServerNameInput
              value={serverName}
              onChange={setServerName}
            />
            <WrapperTypeSelect
              value={wrapperType}
              onChange={setWrapperType}
            />
          </div>

          {/* Connection configuration */}
          <ConnectionSettings
            host={host}
            port={port}
            onHostChange={setHost}
            onPortChange={setPort}
          />

          {/* Database configuration */}
          <DatabaseNameInput
            value={dbname}
            onChange={setDbname}
          />

          {/* Authentication (optional) */}
          <UsernameInput
            value={username}
            onChange={setUsername}
          />

          {/* Information alert */}
          <UserMappingInfoAlert />
        </div>

        <ModalFooter
          onCancel={handleClose}
          onSubmit={handleSubmit}
          isSubmitDisabled={isSubmitDisabled}
        />
      </DialogContent>
    </Dialog>
  );
}

// Re-export types for external use
export type { ServerFormData, CreateServerModalProps };