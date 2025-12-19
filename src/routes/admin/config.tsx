import { createFileRoute } from '@tanstack/react-router'
import PostgresConfig from '../../components/app-admin/pages/PostgresConfig'

export const Route = createFileRoute('/admin/config')({
    component: PostgresConfig,
})
