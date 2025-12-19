import { createFileRoute } from '@tanstack/react-router'
import UsersManager from '../../components/app-admin/pages/UsersManager'

export const Route = createFileRoute('/admin/users')({
    component: UsersManager,
})
