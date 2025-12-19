import { createFileRoute } from '@tanstack/react-router'
import Logs from '../../components/app-admin/pages/Logs'

export const Route = createFileRoute('/admin/logs')({
    component: Logs,
})
