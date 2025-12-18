import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface RootRouterContext {
  auth: {
    user: { role: 'admin' | 'user' } | 'home' | null
    isLoading: boolean
  }
}

export const Route = createRootRouteWithContext<RootRouterContext>()({
  component: () => <Outlet />, // Your global layout (Navbar, etc.)
})
