// src/routes/index.tsx
import { useState, useEffect, lazy, Suspense } from 'react'; 
import { createFileRoute } from '@tanstack/react-router'
const AdminUI = lazy(() => import('../Admin')); 
const UserUI = lazy(() => import('../User'));
import HomePage from '../components/global/HomePage';
import Loading from '../shared/Loading';

export const Route = createFileRoute('/')({
  component: () => {
    const { auth } = Route.useRouteContext()
    
    if (auth.user?.role === 'admin') {
      return (
      	<Suspense fallback={<Loading />}> 
          <AdminUI />
      	</Suspense>
      );
    } else if (auth.user?.role === 'user') {

       
      return (
       	<Suspense fallback={<Loading />}> 
           <UserUI />
       	</Suspense>
      );
    } else {
    	return <HomePage />
    }
  },
})
