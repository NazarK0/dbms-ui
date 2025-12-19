import { createFileRoute } from '@tanstack/react-router'
import RolesManager from '../../components/app-admin/pages/RolesManager'

export const Route = createFileRoute('/admin/roles')({
    component: RolesManager,
})
