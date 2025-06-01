import { useAuthStore } from '@/stores/auth'

export function usePermission() {
  const authStore = useAuthStore()

  function hasPermission(permission: string) {
    return authStore.user.permissions.includes(permission)
  }

  return hasPermission
}
