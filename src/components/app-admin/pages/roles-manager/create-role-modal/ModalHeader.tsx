import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../../../ui/dialog';
import { modalTitle, modalDescription } from './data';
import type { ModalHeaderProps } from './types';

export default function ModalHeader({ isEditMode }: ModalHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>
        {isEditMode ? modalTitle.edit : modalTitle.create}
      </DialogTitle>
      <DialogDescription>
        {isEditMode ? modalDescription.edit : modalDescription.create}
      </DialogDescription>
    </DialogHeader>
  );
}
