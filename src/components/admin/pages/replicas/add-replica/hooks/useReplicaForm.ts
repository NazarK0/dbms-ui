/**
 * useReplicaForm Hook
 * 
 * Manages form state and validation for adding new replica clusters.
 * Handles form data, submission logic, and reset functionality.
 * 
 * @module hooks/useReplicaForm
 */

import { useState } from 'react';
import { validateReplicaConfig } from '../../utils/validators';
import type { AddReplicaFormData } from '../../types';

/**
 * Initial form data values
 */
const INITIAL_FORM_DATA: AddReplicaFormData = {
  name: '',
  host: '',
  port: 5432,
  location: 'us-east',
  replicationMode: 'async',
};

/**
 * Props for useReplicaForm hook
 */
interface UseReplicaFormProps {
  /**
   * Callback executed on successful form submission
   */
  onSubmit?: (data: AddReplicaFormData) => void;
  
  /**
   * Callback to close the dialog
   */
  onClose: () => void;
}

/**
 * Return type for useReplicaForm hook
 */
interface UseReplicaFormReturn {
  /**
   * Current form data
   */
  formData: AddReplicaFormData;
  
  /**
   * Update form field value
   */
  updateField: <K extends keyof AddReplicaFormData>(
    field: K,
    value: AddReplicaFormData[K]
  ) => void;
  
  /**
   * Handle form submission with validation
   */
  handleSubmit: () => void;
  
  /**
   * Reset form to initial values
   */
  resetForm: () => void;
}

/**
 * Custom hook for managing replica form state and logic
 * 
 * @param props - Hook configuration
 * @returns Form state and handlers
 * 
 * @example
 * ```tsx
 * function AddReplicaDialog() {
 *   const { formData, updateField, handleSubmit, resetForm } = useReplicaForm({
 *     onSubmit: (data) => console.log('Submitted:', data),
 *     onClose: () => setOpen(false)
 *   });
 * 
 *   return (
 *     <Input
 *       value={formData.name}
 *       onChange={(e) => updateField('name', e.target.value)}
 *     />
 *   );
 * }
 * ```
 */
export function useReplicaForm({ onSubmit, onClose }: UseReplicaFormProps): UseReplicaFormReturn {
  const [formData, setFormData] = useState<AddReplicaFormData>(INITIAL_FORM_DATA);

  /**
   * Update a single form field
   */
  const updateField = <K extends keyof AddReplicaFormData>(
    field: K,
    value: AddReplicaFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Reset form to initial values
   */
  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  /**
   * Handle form submission with validation
   */
  const handleSubmit = () => {
    const validation = validateReplicaConfig(formData);
    
    if (!validation.valid) {
      alert(validation.errors.join('\n'));
      return;
    }

    // Call parent submit handler
    onSubmit?.(formData);
    
    // Reset form and close dialog
    resetForm();
    onClose();
  };

  return {
    formData,
    updateField,
    handleSubmit,
    resetForm,
  };
}
