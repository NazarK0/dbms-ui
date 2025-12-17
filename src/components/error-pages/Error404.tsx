import { Search, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface Error404Props {
  onBack?: () => void;
  onHome?: () => void;
  message?: string;
  resourceType?: string;
}

export function Error404({ 
  onBack, 
  onHome, 
  message,
  resourceType = 'сторінку'
}: Error404Props) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-6">
              <Search className="h-16 w-16 text-blue-600 dark:text-blue-500" />
            </div>
          </div>

          {/* Status Code */}
          <div className="mb-4">
            <h1 className="text-6xl text-muted-foreground mb-2">404</h1>
            <h2 className="text-2xl text-foreground">Сторінку не знайдено</h2>
          </div>

          {/* Message */}
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {message || 
              `Запитувану ${resourceType} не знайдено. Можливо, вона була видалена або переміщена.`}
          </p>

          {/* Suggestions */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground mb-3">
              Можливі причини:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Некоректна адреса в URL</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Ресурс було видалено або переміщено</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Відсутні права доступу до ресурсу</span>
              </li>
            </ul>
          </div>

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
        </CardContent>
      </Card>
    </div>
  );
}
