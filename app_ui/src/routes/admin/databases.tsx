import { createFileRoute } from '@tanstack/react-router'
import DatabaseManager from '../../components/app-admin/pages/database-manager'

export const Route = createFileRoute('/admin/databases')({
    component: DatabaseManager,
})
