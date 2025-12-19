import { createFileRoute } from '@tanstack/react-router'
import AppAdmin from '../../components/app-admin'

export const Route = createFileRoute('/admin')({
  component: AppAdmin,
})
