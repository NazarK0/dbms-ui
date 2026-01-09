import { createFileRoute } from '@tanstack/react-router'
import AppUser from '../components/app-user'

export const Route = createFileRoute('/user')({
    component: AppUser,
})
