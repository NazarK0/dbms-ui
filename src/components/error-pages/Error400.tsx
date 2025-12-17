import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface Error400Props {
  onBack?: () => void;
  onHome?: () => void;
  message?: string;
}

export function Error400({ onBack, onHome, message }: Error400Props) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/20 p-6">
              <AlertTriangle className="h-16 w-16 text-yellow-600 dark:text-yellow-500" />
            </div>
          </div>

          {/* Status Code */}
          <div className="mb-4">
            <h1 className="text-6xl text-muted-foreground mb-2">400</h1>
            <h2 className="text-2xl text-foreground">Невірний запит</h2>
          </div>

          {/* Message */}
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {message || 
              'Запит містить помилки або некоректні дані. Будь ласка, перевірте введені дані та спробуйте ще раз.'}
          </p>

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
              Якщо проблема повторюється, зверніться до адміністратора системи
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
