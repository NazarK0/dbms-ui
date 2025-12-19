import { createFileRoute } from '@tanstack/react-router'
import CLI from '../../components/app-admin/pages/CLI'

export const Route = createFileRoute('/admin/cli')({
    component: CLI,
})
