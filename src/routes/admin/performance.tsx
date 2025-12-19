import { createFileRoute } from '@tanstack/react-router'
import PerformanceAnalyzer from '../../components/app-admin/pages/PerformanceAnalyzer'

export const Route = createFileRoute('/admin/performance')({
    component: PerformanceAnalyzer,
})
