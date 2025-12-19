import { createFileRoute } from '@tanstack/react-router'
import UsersManager from '../../components/app-admin/pages/users-manager'

export const Route = createFileRoute('/admin/users')({
    component: UsersManager,
})
