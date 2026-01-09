import { ServerCrash, Home, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Alert, AlertDescription } from '../../ui/alert';

interface Error500Props {
  onRetry?: () => void;
  onHome?: () => void;
  message?: string;
  errorId?: string;
  timestamp?: string;
  showTechnicalDetails?: boolean;
  technicalMessage?: string;
}

export function Error500({ 
  onRetry, 
  onHome, 
  message,
  errorId,
  timestamp,
  showTechnicalDetails = false,
  technicalMessage
}: Error500Props) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-destructive/10 dark:bg-destructive/20 p-6">
              <ServerCrash className="h-16 w-16 text-destructive" />
            </div>
          </div>

          {/* Status Code */}
          <div className="mb-4">
            <h1 className="text-6xl text-muted-foreground mb-2">500</h1>
            <h2 className="text-2xl text-foreground">Внутрішня помилка сервера</h2>
          </div>

          {/* Message */}
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {message || 
              'Виникла помилка при обробці вашого запиту. Наша команда вже працює над її усуненням.'}
          </p>

          {/* Error Details */}
          {(errorId || timestamp) && (
            <Alert className="mb-8 max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="text-left space-y-1">
                  {errorId && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">ID помилки: </span>
                      <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                        {errorId}
                      </code>
                    </div>
                  )}
                  {timestamp && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Час: </span>
                      <span className="font-mono text-xs">{timestamp}</span>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Technical Details (for developers) */}
          {showTechnicalDetails && technicalMessage && (
            <div className="mb-8 max-w-md mx-auto">
              <details className="text-left bg-muted/50 rounded-lg p-4">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Технічні деталі
                </summary>
                <div className="mt-3 pt-3 border-t border-border">
                  <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap break-words">
                    {technicalMessage}
                  </pre>
                </div>
              </details>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-center flex-wrap">
            {onRetry && (
              <Button
                onClick={onRetry}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Спробувати ще раз
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
              Якщо проблема не зникає, зверніться до адміністратора системи
            </p>
            {errorId && (
              <p className="text-xs text-muted-foreground mt-2">
                Надайте ID помилки для швидшої діагностики
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
