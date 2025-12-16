import { useState, useEffect, lazy, Suspense } from 'react';
import { Database, Server } from 'lucide-react';
import { Alert, AlertDescription } from './components/ui/alert';
import HomePage from './components/global/HomePage';

// Lazy load heavy components
const Admin = lazy(() => import('./Admin'));
const User = lazy(() => import('./User'));

type View = 'home' | 'admin' | 'user';

// Loading fallback component
function AppLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
          <Database className="w-10 h-10 text-white" />
        </div>
        <p className="text-slate-600">Завантаження...</p>
      </div>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile blocking screen
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Database className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-slate-900 mb-2">PostgreSQL Адміністратор</h2>
          <p className="text-slate-600 mb-6">
            Для роботи з системою управління базами даних використовуйте персональний комп'ютер або ноутбук
          </p>
          <Alert className="bg-blue-50 border-blue-200">
            <Server className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              Мінімальна ширина екрану: 1024px
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // Route to different views
  if (currentView === 'home') {
    return <HomePage onNavigate={setCurrentView} />;
  }

  if (currentView === 'admin') {
    return (
      <Suspense fallback={<AppLoading />}>
        <Admin onBack={() => setCurrentView('home')} />
      </Suspense>
    );
  }

  if (currentView === 'user') {
    return (
      <Suspense fallback={<AppLoading />}>
        <User onBack={() => setCurrentView('home')} />
      </Suspense>
    );
  }

  return null;
}