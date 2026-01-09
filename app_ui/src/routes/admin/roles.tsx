import { createFileRoute } from '@tanstack/react-router'
import RolesManager from '../../components/app-admin/pages/roles-manager'

export const Route = createFileRoute('/admin/roles')({
    component: RolesManager,
})
