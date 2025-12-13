/**
 * Shared custom hook for managing CreateRecord and EditRecord form state
 */

import { useState } from 'react';
import { validateFormData } from '../form/formUtils';
import type { RecordFormMode, RecordFormState } from './types';

export function useRecordForm(
  tableSchema: any[],
  mode: RecordFormMode,
  initialData?: Record<string, any>,
  initialExistingFiles?: string[]
) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>(initialExistingFiles || []);
  const [markdownPreview, setMarkdownPreview] = useState<Record<string, boolean>>({});

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveNewFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingFile = (index: number) => {
    setExistingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleMarkdownPreview = (fieldName: string) => {
    setMarkdownPreview((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const validateForm = (): boolean => {
    const validationErrors = validateFormData(tableSchema, formData, mode);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const getFormDataWithFiles = () => {
    return {
      ...formData,
      attachments: attachedFiles,
      existingFiles: existingFiles,
    };
  };

  const resetForm = () => {
    setFormData(initialData || {});
    setErrors({});
    setAttachedFiles([]);
    setExistingFiles(initialExistingFiles || []);
    setMarkdownPreview({});
  };

  return {
    formData,
    errors,
    attachedFiles,
    existingFiles,
    markdownPreview,
    handleChange,
    handleFileChange,
    handleRemoveNewFile,
    handleRemoveExistingFile,
    toggleMarkdownPreview,
    validateForm,
    getFormDataWithFiles,
    resetForm,
  };
}
