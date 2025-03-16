import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { UserRegistration, User } from '@/types/User'
import {
  type ServerResponseAccessToken,
  type ServerResponseAuth,
} from '@/types/ServerResponse'
import useFetch from '@/composables/useFetch'
import { useModalStore } from '@/store/modal'

export const useAuthStore = defineStore('auth', () => {
  const modalStore = useModalStore()

  const router = useRouter()

  /** Список ошибок */
  const errors = ref<string[]>([])

  /** `ID` пользователя */
  const uid = ref<number | undefined>()

  /** `email` пользователя */
  const email = ref<string | undefined>()

  /** Авторизация пользователя в аккаунт */
  async function getAuthToken(formData: User) {
    const data = await useFetch<ServerResponseAccessToken>({
      url: 'api/auth',
      body: formData,
      method: 'POST',
    })
    if (data.error) return

    localStorage.setItem('accessToken', data.accessToken)
    modalStore.setModal(null)

    signIn()
  }

  /** Выход пользователя из аккаунта */
  async function signOut() {
    await useFetch<undefined>({
      url: 'api/auth',
      method: 'DELETE',
    })

    localStorage.removeItem('accessToken')
    uid.value = undefined
    email.value = undefined

    router.push('/')
  }

  /** Вход пользователя в аккаунт */
  async function signIn() {
    const data = await useFetch<ServerResponseAuth>({
      url: 'api/auth',
    })
    if (data.error) {
      localStorage.removeItem('accessToken')
      return
    }

    uid.value = data.id
    email.value = data.email

    router.push('/notes')
  }

  /** Регистрация пользователя */
  async function signUp(formData: UserRegistration) {
    const data = await useFetch<ServerResponseAuth>({
      url: 'api/reg',
      body: formData,
      method: 'POST',
    })

    if (data?.error) {
      if (typeof data.message === 'string') {
        errors.value = [data.message]
        return
      }
      errors.value = data.message
      return
    }

    if (errors.value) errors.value = []

    const user = {
      email: formData.email,
      password: formData.password,
    } as User

    getAuthToken(user)
  }

  return {
    signUp,
    signIn,
    signOut,
    getAuthToken,
    uid,
    errors,
    email,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
