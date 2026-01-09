import { createFileRoute } from '@tanstack/react-router'
import AuditLog from '../../components/app-admin/pages/audit-log'

export const Route = createFileRoute('/admin/audit')({
    component: AuditLog,
})
