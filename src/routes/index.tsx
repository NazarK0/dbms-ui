// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => {
    const { auth } = Route.useRouteContext()
    
    if (auth.user?.role === 'admin') {
      const AdminUI = lazy(() => import('../Admin')); 
      return <AdminUI />
    } else if (auth.user?.role === 'user') {

      const UserUI = lazy(() => import('../User')); 
      return <UserUI />
    } else {
    	import HomePage from './components/global/HomePage';
    	return <HomePage />
    }
  },
})
