import { Card, CardContent, CardHeader, CardTitle } from '../../../../ui/card';
import UserApplication from '../../../../app-user/UserApplication';
import { UserPreviewProvider } from '../../../../../contexts/UserPreviewContext';
import { previewWindowTitle } from './data';
import DeviceSelector from '../shared/DeviceSelector';
import type { DeviceType } from '../shared/types';
import { Button } from '../../../../ui/button';
import { Maximize2, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../../../ui/dialog';
import { DeviceSize, UserPermissions } from '../types';


export interface PreviewWindowProps {
  deviceType: DeviceType;
  deviceSize: DeviceSize;
  selectedRole: string;
  roleName: string;
  permissions: UserPermissions;
  username?: string;
  userId?: string;
  onDeviceChange: (deviceType: DeviceType) => void;
}

export default function PreviewWindow({
  deviceType,
  deviceSize,
  selectedRole,
  roleName,
  permissions,
  username,
  userId,
  onDeviceChange,
}: PreviewWindowProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Determine scale based on device type
  const getScale = () => {
    switch (deviceType) {
      case 'mobile':
        return 0.35;
      case 'tablet':
        return 0.55;
      default:
        return 0.7;
    }
  };

  const scale = getScale();

  // Fullscreen scale - make it larger
  const getFullscreenScale = () => {
    switch (deviceType) {
      case 'mobile':
        return 0.8;
      case 'tablet':
        return 0.9;
      default:
        return 1;
    }
  };

  const fullscreenScale = getFullscreenScale();

  // Create preview config
  const previewConfig = {
    isPreviewMode: true,
    username: username || undefined,
    userId: userId || undefined,
    previewRole: selectedRole,
  };

  const PreviewContent = ({ fullscreen = false }) => {
    const currentScale = fullscreen ? fullscreenScale : scale;
    
    return (
      <div
        style={{
          width: fullscreen ? '100%' : deviceSize.width,
          maxWidth: fullscreen ? 'none' : '100%',
          height: fullscreen ? '100%' : deviceSize.height,
        }}
        className={`bg-white rounded-lg shadow-xl overflow-hidden relative ${fullscreen ? 'border-4 border-slate-700' : 'border-8 border-slate-800'} ${fullscreen ? 'w-full h-full' : 'mx-auto'}`}
      >
        {/* Real User Interface */}
        <div 
          className={`h-full w-full ${fullscreen ? 'overflow-auto scrollbar-hide' : 'overflow-auto'}`}
          style={{
            transform: `scale(${currentScale})`,
            transformOrigin: 'top left',
            width: `${100 / currentScale}%`,
            height: `${100 / currentScale}%`,
          }}
        >
          <UserPreviewProvider config={previewConfig}>
            <UserApplication />
          </UserPreviewProvider>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm text-slate-600 flex items-center justify-between">
            <span>{previewWindowTitle}</span>
            <div className="flex items-center gap-3">
              {/* Device Selector */}
              <DeviceSelector
                deviceType={deviceType}
                onDeviceChange={onDeviceChange}
              />
              {(username || userId) && (
                <span className="text-xs font-normal text-slate-500">
                  Користувач: {username || userId}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(true)}
                className="h-7 px-2"
                title="Повноекранний режим"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-slate-50">
          <div className="flex justify-center p-6">
            <PreviewContent />
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="!max-w-none !max-h-none !h-screen !w-screen p-0 bg-slate-900 border-0 rounded-none [&>button]:hidden !top-0 !left-0 !translate-x-0 !translate-y-0">
          <DialogTitle className="sr-only">
            {previewWindowTitle} - {username || userId || 'Попередній перегляд'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Повноекранний перегляд користувацького інтерфейсу для ролі {roleName}
          </DialogDescription>
          
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-6 py-4 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-200">{previewWindowTitle}</span>
              {(username || userId) && (
                <span className="text-xs text-slate-400">
                  Користувач: {username || userId}
                </span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(false)}
              className="h-8 px-3 bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-200"
              title="Закрити"
            >
              <X className="h-4 w-4 mr-1" />
              Закрити
            </Button>
          </div>

          {/* Preview Content */}
          <div className="h-screen w-screen pt-16 pb-6 px-6 flex items-center justify-center overflow-hidden">
            <div className="h-full w-full max-h-full max-w-full">
              <PreviewContent fullscreen />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}