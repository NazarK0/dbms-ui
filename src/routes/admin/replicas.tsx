import { createFileRoute } from '@tanstack/react-router'
import ReplicaClusters from '../../components/app-admin/pages/ReplicaClusters'

export const Route = createFileRoute('/admin/replicas')({
    component: ReplicaClusters,
})
