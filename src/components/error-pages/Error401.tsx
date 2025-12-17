import { ShieldAlert, Home, LogIn } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface Error401Props {
  onLogin?: () => void;
  onHome?: () => void;
  message?: string;
}

export function Error401({ onLogin, onHome, message }: Error401Props) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-orange-100 dark:bg-orange-900/20 p-6">
              <ShieldAlert className="h-16 w-16 text-orange-600 dark:text-orange-500" />
            </div>
          </div>

          {/* Status Code */}
          <div className="mb-4">
            <h1 className="text-6xl text-muted-foreground mb-2">401</h1>
            <h2 className="text-2xl text-foreground">Неавторизований доступ</h2>
          </div>

          {/* Message */}
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {message || 
              'Для доступу до цього ресурсу необхідна автентифікація. Будь ласка, увійдіть до системи.'}
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-center flex-wrap">
            {onLogin && (
              <Button
                onClick={onLogin}
                className="gap-2"
              >
                <LogIn className="h-4 w-4" />
                Увійти до системи
              </Button>
            )}
            {onHome && (
              <Button
                onClick={onHome}
                variant="outline"
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
              Автентифікація здійснюється через Microsoft Active Directory
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
