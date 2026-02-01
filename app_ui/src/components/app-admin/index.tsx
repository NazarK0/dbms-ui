import { useState } from 'react';
import { Outlet } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Monitor } from 'lucide-react';
import AdminHeader from './AdminHeader';
import { AdminUserProvider } from '../../contexts/AdminUserContext';
import { SkeletonCardGrid } from '../ui/skeletons';


import NavBar from "./NavBar";


type Tab = 'dashboard' | 'databases' | 'users' | 'roles' | 'userui' | 'audit' | 'config' | 'cli' | 'performance' | 'replicas' | 'monitor' | 'logs';


export default function AppAdmin() {
  return (
    <AdminUserProvider>
      <div className="h-screen bg-gradient-to-br from-lime-50 via-green-50 to-yellow-50">
        {/* Mobile Warning */}
        <div className="md:hidden flex items-center justify-center h-screen p-6 bg-lime-600">
          <Card className="border-lime-200 shadow-xl max-w-md">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-center">Використовуйте ПК</CardTitle>
              <CardDescription className="text-center">
                Ця система управління базами даних доступна тільки на персональних комп'ютерах та ноутбуках
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Desktop UI */}
        <div className="hidden md:block">
          <AdminHeader />
          <main className="h-full p-6">
            <NavBar />
            <Outlet />
          </main>
        </div>
      </div>
    </AdminUserProvider>
  );
}