import { Database, UserCog, Users, Shield, ArrowRight, Sparkles, Lock, Zap } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';

import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';

export default function PresentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg">
                <Database className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">PostgreSQL DBMS</h1>
                <p className="text-slate-600 text-sm">Повнофункціональна система управління базами даних</p>
              </div>
            </div>
            <Badge variant="outline" className="gap-2 px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Production Ready
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm mb-4">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm text-slate-700">Презентація проєкту</span>
            </div>
            <h2 className="text-slate-900 text-5xl mb-4">
              Оберіть тип інтерфейсу
            </h2>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto">
              Система розділена на два окремих інтерфейси: адміністративна панель для управління СУБД 
              та користувацький додаток з role-based функціоналом
            </p>
          </div>

          {/* Two Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Admin Panel Card */}
            <Card className="border-lime-200 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden relative">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-green-50 to-yellow-50 opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <UserCog className="w-9 h-9 text-white" />
                  </div>
                  <CardTitle className="text-center text-3xl mb-2">
                    Адмін Панель
                  </CardTitle>
                  <CardDescription className="text-center text-base">
                    Повний контроль над PostgreSQL базами даних
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-lime-200">
                      <div className="w-8 h-8 bg-lime-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Database className="w-4 h-4 text-lime-700" />
                      </div>
                      <div>
                        <p className="text-slate-900 font-medium">Управління БД</p>
                        <p className="text-sm text-slate-600">Створення, модифікація, моніторинг баз даних</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-lime-200">
                      <div className="w-8 h-8 bg-lime-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-lime-700" />
                      </div>
                      <div>
                        <p className="text-slate-900 font-medium">Ролі та права</p>
                        <p className="text-sm text-slate-600">RBAC матриця, RLS політики, UI visibility</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-lime-200">
                      <div className="w-8 h-8 bg-lime-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-lime-700" />
                      </div>
                      <div>
                        <p className="text-slate-900 font-medium">SQL Редактор</p>
                        <p className="text-sm text-slate-600">Виконання запитів, аналіз продуктивності</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-lg border border-lime-200">
                    <div className="text-center">
                      <p className="text-2xl text-lime-600 mb-1">12</p>
                      <p className="text-xs text-slate-600">Розділів</p>
                    </div>
                    <div className="text-center border-l border-r border-lime-200">
                      <p className="text-2xl text-lime-600 mb-1">47</p>
                      <p className="text-xs text-slate-600">Прав доступу</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl text-lime-600 mb-1">∞</p>
                      <p className="text-xs text-slate-600">Можливостей</p>
                    </div>
                  </div>

                  {/* Button */}
                  <Button className="w-full bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all group/btn h-12 text-base">
                    <Link to="/admin" className="flex items-center justify-center w-full">
                      <span>Відкрити адмін панель</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                  </Button>
                  

                  {/* Access Note */}
                  <div className="flex items-center gap-2 p-3 bg-lime-50 border border-lime-200 rounded-lg">
                    <Lock className="w-4 h-4 text-lime-700 flex-shrink-0" />
                    <p className="text-xs text-slate-700">
                      Доступ: Superadmin, Database Admin, Developer, Analyst, Viewer
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* User Application Card */}
            <Card className="border-violet-200 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden relative">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Users className="w-9 h-9 text-white" />
                  </div>
                  <CardTitle className="text-center text-3xl mb-2">
                    Користувацький UI
                  </CardTitle>
                  <CardDescription className="text-center text-base">
                    Інтерфейс для кінцевих користувачів застосунку
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features List */}
                  <ul className="space-y-2 text-slate-700 mb-6">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2"></div>
                      <span><strong>CRUD операції:</strong> Створення, читання, оновлення та видалення записів</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2"></div>
                      <span><strong>Браузер БД:</strong> Перегляд доступних баз даних та таблиць</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2"></div>
                      <span><strong>Права доступу:</strong> Операції обмежені призначеними ролями</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2"></div>
                      <span><strong>Row Level Security:</strong> Доступ до даних на основі RLS політик</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2"></div>
                      <span><strong>Пагінація:</strong> Ефективний перегляд великих обсягів даних</span>
                    </li>
                  </ul>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-lg border border-violet-200">
                    <div className="text-center">
                      <p className="text-2xl text-violet-600 mb-1">RBAC</p>
                      <p className="text-xs text-slate-600">Контроль доступу</p>
                    </div>
                    <div className="text-center border-l border-r border-violet-200">
                      <p className="text-2xl text-violet-600 mb-1">RLS</p>
                      <p className="text-xs text-slate-600">Безпека рядків</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl text-violet-600 mb-1">15</p>
                      <p className="text-xs text-slate-600">Таблиць</p>
                    </div>
                  </div>

                  {/* Button */}
                  <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all group/btn h-12 text-base">
                    <Link to="/user" className="flex items-center justify-center w-full">
                      <span>Відкрити користувацький UI</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  {/* Access Note */}
                  <div className="flex items-center gap-2 p-3 bg-violet-50 border border-violet-200 rounded-lg">
                    <Lock className="w-4 h-4 text-violet-700 flex-shrink-0" />
                    <p className="text-xs text-slate-700">
                      Доступ: На основі призначених ролей (Developer, Data Analyst, Content Manager, та інші)
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Technical Info */}
          <div className="mt-16 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Database className="w-5 h-5 text-blue-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 font-medium mb-2">Про систему</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Повнофункціональна система управління PostgreSQL з RBAC, Row Level Security, 
                  real-time моніторингом, аналітикою продуктивності, управлінням реплікаціями та 
                  резервним копіюванням. Інтерфейс повністю українською мовою з адаптивним дизайном.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-300">PostgreSQL</Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-300">React</Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-300">TypeScript</Badge>
                  <Badge variant="secondary" className="bg-pink-100 text-pink-700 border-pink-300">Tailwind CSS</Badge>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-300">shadcn/ui</Badge>
                  <Badge variant="secondary" className="bg-lime-100 text-lime-700 border-lime-300">RBAC</Badge>
                  <Badge variant="secondary" className="bg-violet-100 text-violet-700 border-violet-300">RLS</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <p>PostgreSQL DBMS © 2024</p>
            <p>Повнофункціональна система управління базами даних</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
