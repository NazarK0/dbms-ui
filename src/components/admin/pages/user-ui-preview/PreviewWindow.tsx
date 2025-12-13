import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import MockUserInterface from './MockUserInterface';
import { previewWindowTitle } from './data';
import type { PreviewWindowProps } from './types';

export default function PreviewWindow({
  deviceType,
  deviceSize,
  selectedRole,
  roleName,
  permissions,
}: PreviewWindowProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm text-slate-600">
          {previewWindowTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-slate-50">
        <div className="flex justify-center p-6">
          <div
            style={{
              width: deviceSize.width,
              maxWidth: '100%',
              height: deviceSize.height,
            }}
            className="bg-white rounded-lg shadow-xl border-8 border-slate-800 overflow-hidden"
          >
            {/* Mock User Interface */}
            <MockUserInterface
              deviceType={deviceType}
              selectedRole={selectedRole}
              roleName={roleName}
              permissions={permissions}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
