import { useState } from 'react';
import { Eye, Monitor, Smartphone, Tablet, Settings, User, CreditCard, Bell, HelpCircle, LogOut, Home, FolderOpen, Star, Share2, Download, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export default function UserUIPreview() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [selectedRole, setSelectedRole] = useState('premium');

  const roles = [
    { id: 'premium', name: 'Premium User', color: 'from-violet-500 to-purple-600' },
    { id: 'standard', name: 'Standard User', color: 'from-blue-500 to-cyan-600' },
    { id: 'free', name: 'Free User', color: 'from-slate-400 to-slate-500' },
    { id: 'trial', name: 'Trial User', color: 'from-amber-500 to-orange-600' },
  ];

  const deviceSizes = {
    desktop: { width: '100%', height: '600px' },
    tablet: { width: '768px', height: '600px' },
    mobile: { width: '375px', height: '667px' },
  };

  const permissions = {
    premium: {
      createProjects: true,
      deleteProjects: true,
      shareProjects: true,
      exportData: true,
      importData: true,
      useApi: true,
      customBranding: true,
      prioritySupport: true,
    },
    standard: {
      createProjects: true,
      deleteProjects: true,
      shareProjects: true,
      exportData: true,
      importData: false,
      useApi: false,
      customBranding: false,
      prioritySupport: false,
    },
    free: {
      createProjects: true,
      deleteProjects: false,
      shareProjects: false,
      exportData: false,
      importData: false,
      useApi: false,
      customBranding: false,
      prioritySupport: false,
    },
    trial: {
      createProjects: true,
      deleteProjects: true,
      shareProjects: true,
      exportData: true,
      importData: true,
      useApi: true,
      customBranding: false,
      prioritySupport: true,
    },
  };

  const currentPermissions = permissions[selectedRole as keyof typeof permissions];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-lime-600" />
                Перегляд користувацького інтерфейсу
              </CardTitle>
              <CardDescription>
                Попередній перегляд інтерфейсу для різних ролей користувачів
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {/* Role Selector */}
            <div className="flex items-center gap-3">
              <Label className="text-slate-700">Роль користувача:</Label>
              <div className="flex gap-2">
                {roles.map((role) => (
                  <Button
                    key={role.id}
                    variant={selectedRole === role.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedRole(role.id)}
                    className={selectedRole === role.id ? `bg-gradient-to-r ${role.color} text-white border-0` : ''}
                  >
                    {role.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Device Selector */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
              <Button
                variant={deviceType === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceType('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={deviceType === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceType('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={deviceType === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceType('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Window */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm text-slate-600">Попередній перегляд інтерфейсу</CardTitle>
            </CardHeader>
            <CardContent className="bg-slate-50">
              <div className="flex justify-center p-6">
                <div
                  style={{
                    width: deviceSizes[deviceType].width,
                    maxWidth: '100%',
                    height: deviceSizes[deviceType].height,
                  }}
                  className="bg-white rounded-lg shadow-xl border-8 border-slate-800 overflow-hidden"
                >
                  {/* Mock User Interface */}
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-lime-500 to-green-600 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                          <Home className="w-5 h-5 text-lime-600" />
                        </div>
                        {deviceType === 'desktop' && (
                          <span className="text-white">Мій застосунок</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-white/20 text-white border-0">
                          {roles.find(r => r.id === selectedRole)?.name}
                        </Badge>
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    {deviceType === 'desktop' && (
                      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-2 text-lime-600 font-medium">
                          <Home className="w-4 h-4" />
                          Головна
                        </button>
                        <button className="flex items-center gap-2 text-slate-600 hover:text-lime-600">
                          <FolderOpen className="w-4 h-4" />
                          Проєкти
                        </button>
                        {currentPermissions.useApi && (
                          <button className="flex items-center gap-2 text-slate-600 hover:text-lime-600">
                            <Settings className="w-4 h-4" />
                            API
                          </button>
                        )}
                        <button className="flex items-center gap-2 text-slate-600 hover:text-lime-600">
                          <HelpCircle className="w-4 h-4" />
                          Допомога
                        </button>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-4 overflow-auto">
                      <div className="space-y-4">
                        {/* Welcome Card */}
                        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-4">
                          <h3 className="text-slate-900 mb-1">Вітаємо!</h3>
                          <p className="text-sm text-slate-600">
                            Ваша роль: <strong>{roles.find(r => r.id === selectedRole)?.name}</strong>
                          </p>
                        </div>

                        {/* Actions Grid */}
                        <div className={`grid ${deviceType === 'mobile' ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
                          <button
                            className={`p-4 rounded-lg border-2 text-center ${
                              currentPermissions.createProjects
                                ? 'border-lime-200 bg-lime-50 hover:border-lime-300'
                                : 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!currentPermissions.createProjects}
                          >
                            <FolderOpen className={`w-6 h-6 mx-auto mb-2 ${currentPermissions.createProjects ? 'text-lime-600' : 'text-slate-400'}`} />
                            <div className="text-xs text-slate-900">Новий проєкт</div>
                          </button>

                          <button
                            className={`p-4 rounded-lg border-2 text-center ${
                              currentPermissions.shareProjects
                                ? 'border-lime-200 bg-lime-50 hover:border-lime-300'
                                : 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!currentPermissions.shareProjects}
                          >
                            <Share2 className={`w-6 h-6 mx-auto mb-2 ${currentPermissions.shareProjects ? 'text-lime-600' : 'text-slate-400'}`} />
                            <div className="text-xs text-slate-900">Поділитись</div>
                          </button>

                          <button
                            className={`p-4 rounded-lg border-2 text-center ${
                              currentPermissions.exportData
                                ? 'border-lime-200 bg-lime-50 hover:border-lime-300'
                                : 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!currentPermissions.exportData}
                          >
                            <Download className={`w-6 h-6 mx-auto mb-2 ${currentPermissions.exportData ? 'text-lime-600' : 'text-slate-400'}`} />
                            <div className="text-xs text-slate-900">Експорт</div>
                          </button>

                          <button
                            className={`p-4 rounded-lg border-2 text-center ${
                              currentPermissions.importData
                                ? 'border-lime-200 bg-lime-50 hover:border-lime-300'
                                : 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!currentPermissions.importData}
                          >
                            <Upload className={`w-6 h-6 mx-auto mb-2 ${currentPermissions.importData ? 'text-lime-600' : 'text-slate-400'}`} />
                            <div className="text-xs text-slate-900">Імпорт</div>
                          </button>

                          <button
                            className={`p-4 rounded-lg border-2 text-center ${
                              currentPermissions.customBranding
                                ? 'border-lime-200 bg-lime-50 hover:border-lime-300'
                                : 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!currentPermissions.customBranding}
                          >
                            <Star className={`w-6 h-6 mx-auto mb-2 ${currentPermissions.customBranding ? 'text-lime-600' : 'text-slate-400'}`} />
                            <div className="text-xs text-slate-900">Брендинг</div>
                          </button>

                          <button
                            className={`p-4 rounded-lg border-2 text-center ${
                              currentPermissions.useApi
                                ? 'border-lime-200 bg-lime-50 hover:border-lime-300'
                                : 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!currentPermissions.useApi}
                          >
                            <Settings className={`w-6 h-6 mx-auto mb-2 ${currentPermissions.useApi ? 'text-lime-600' : 'text-slate-400'}`} />
                            <div className="text-xs text-slate-900">API</div>
                          </button>
                        </div>

                        {/* Support Badge */}
                        {currentPermissions.prioritySupport && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
                            <Bell className="w-4 h-4 text-amber-600" />
                            <span className="text-sm text-amber-900">Пріоритетна підтримка активна</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permissions Panel */}
        <div>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm text-slate-600">Доступні можливості</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-900">Створення проєктів</span>
                  <Badge variant={currentPermissions.createProjects ? 'default' : 'outline'}>
                    {currentPermissions.createProjects ? 'Дозволено' : 'Заборонено'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-900">Видалення проєктів</span>
                  <Badge variant={currentPermissions.deleteProjects ? 'default' : 'outline'}>
                    {currentPermissions.deleteProjects ? 'Дозволено' : 'Заборонено'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-900">Спільний доступ</span>
                  <Badge variant={currentPermissions.shareProjects ? 'default' : 'outline'}>
                    {currentPermissions.shareProjects ? 'Дозволено' : 'Заборонено'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-900">Експорт даних</span>
                  <Badge variant={currentPermissions.exportData ? 'default' : 'outline'}>
                    {currentPermissions.exportData ? 'Дозволено' : 'Заборонено'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-900">Імпорт даних</span>
                  <Badge variant={currentPermissions.importData ? 'default' : 'outline'}>
                    {currentPermissions.importData ? 'Дозволено' : 'Заборонено'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-900">Використання API</span>
                  <Badge variant={currentPermissions.useApi ? 'default' : 'outline'}>
                    {currentPermissions.useApi ? 'Дозволено' : 'Заборонено'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-900">Свій брендинг</span>
                  <Badge variant={currentPermissions.customBranding ? 'default' : 'outline'}>
                    {currentPermissions.customBranding ? 'Дозволено' : 'Заборонено'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-900">Пріоритетна підтримка</span>
                  <Badge variant={currentPermissions.prioritySupport ? 'default' : 'outline'}>
                    {currentPermissions.prioritySupport ? 'Дозволено' : 'Заборонено'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}