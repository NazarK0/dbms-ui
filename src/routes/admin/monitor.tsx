import { createFileRoute } from '@tanstack/react-router'
import SystemMonitor from '../../components/app-admin/pages/system-monitor'

export const Route = createFileRoute('/admin/monitor')({
    component: SystemMonitor,
})
