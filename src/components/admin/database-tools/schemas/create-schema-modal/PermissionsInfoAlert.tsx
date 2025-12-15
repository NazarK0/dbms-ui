/**
 * Create Schema Modal - Permissions Info Alert
 * 
 * Informational alert reminding users to grant permissions after schema creation.
 */

import { Alert, AlertDescription } from '../../../../ui/alert';

export default function PermissionsInfoAlert() {
  return (
    <Alert>
      <AlertDescription>
        <strong>Примітка:</strong> Після створення схеми, не забудьте надати відповідні права доступу користувачам.
      </AlertDescription>
    </Alert>
  );
}
