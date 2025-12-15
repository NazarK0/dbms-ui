/**
 * Create Foreign Server Modal - User Mapping Info Alert
 * 
 * Informational alert explaining the next steps after creating a foreign server.
 * Reminds users about USER MAPPING and foreign tables configuration.
 */

import { Alert, AlertDescription } from '../../../../ui/alert';

export default function UserMappingInfoAlert() {
  return (
    <Alert>
      <AlertDescription>
        <strong>Примітка:</strong> Після створення сервера, вам потрібно буде створити USER MAPPING для автентифікації та налаштувати foreign tables.
      </AlertDescription>
    </Alert>
  );
}
