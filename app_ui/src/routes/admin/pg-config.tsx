import { createFileRoute } from '@tanstack/react-router'
import PostgresConfig from '../../components/app-admin/pages/pg-config'

export const Route = createFileRoute('/admin/pg-config')({
    component: PostgresConfig,
})
