import { createFileRoute } from '@tanstack/react-router'
import UserUIPreview from '../../components/app-admin/pages/user-ui-preview'

export const Route = createFileRoute('/admin/userui')({
    component: UserUIPreview,
})
