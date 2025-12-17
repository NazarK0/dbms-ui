import { ShieldX, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';

interface Error403Props {
  onBack?: () => void;
  onHome?: () => void;
  message?: string;
  requiredRole?: string;
  currentRole?: string;
}

export function Error403({ 
  onBack, 
  onHome, 
  message, 
  requiredRole,
  currentRole 
}: Error403Props) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-6">
              <ShieldX className="h-16 w-16 text-red-600 dark:text-red-500" />
            </div>
          </div>

          {/* Status Code */}
          <div className="mb-4">
            <h1 className="text-6xl text-muted-foreground mb-2">403</h1>
            <h2 className="text-2xl text-foreground">Доступ заборонено</h2>
          </div>

          {/* Message */}
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {message || 
              'У вас немає необхідних прав доступу для перегляду цього ресурсу. Зверніться до адміністратора системи для отримання доступу.'}
          </p>

          {/* Role Information */}
          {(requiredRole || currentRole) && (
            <Alert className="mb-8 max-w-md mx-auto">
              <AlertDescription>
                {currentRole && (
                  <div className="mb-2">
                    <span className="text-muted-foreground">Ваша роль: </span>
                    <span className="font-medium">{currentRole}</span>
                  </div>
                )}
                {requiredRole && (
                  <div>
                    <span className="text-muted-foreground">Необхідна роль: </span>
                    <span className="font-medium">{requiredRole}</span>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-center flex-wrap">
            {onBack && (
              <Button
                onClick={onBack}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Повернутися назад
              </Button>
            )}
            {onHome && (
              <Button
                onClick={onHome}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                На головну
              </Button>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Управління доступом здійснюється через RBAC матрицю з Row Level Security
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
