import { createFileRoute } from '@tanstack/react-router'
import AuditLog from '../../components/app-admin/pages/AuditLog'

export const Route = createFileRoute('/admin/audit')({
    component: AuditLog,
})
