import { createFileRoute } from '@tanstack/react-router'
import ReplicaClusters from '../../components/app-admin/pages/replicas'

export const Route = createFileRoute('/admin/replicas')({
    component: ReplicaClusters,
})
