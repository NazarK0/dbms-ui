import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../../components/app-admin/pages/Dashboard'

export const Route = createFileRoute('/admin')({
    component: Dashboard,
})
