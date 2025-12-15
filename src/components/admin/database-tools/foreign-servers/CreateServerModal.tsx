/**
 * Create Foreign Server Modal
 * 
 * This file is a compatibility layer that re-exports the modular CreateServerModal.
 * The actual implementation has been refactored into multiple subcomponents.
 * 
 * @see /components/admin/database-tools/foreign-servers/create-server-modal/
 */

export { default } from './create-server-modal';
export type { ServerFormData, CreateServerModalProps } from './create-server-modal/types';
