<script setup lang="ts">
import { reactive, computed } from 'vue'
import UiInput from '@/components/ui/UiInput.vue'
import FormControls from '@/components/FormControls.vue'
import ModalAuthorization from '@/components/modals/ModalAuthorization.vue'
import { useAuthStore } from '@/store/auth'
import type { UserRegistration } from '@/types/User'

const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  confirm_password: '',
}) as UserRegistration

/** Функция для регистрации пользователя */
function signUp() {
  authStore.signUp(form)
}

/** Влключена ли кнопка `action` */
const isButtonEnabled = computed(() =>
  Object.values(form).every((value) => value)
)
</script>

<template>
  <div class="reg-modal">
    <h2 class="reg-modal__title">Регистрация</h2>

    <!-- Форма для регистрации -->
    <form class="reg-modal__form">
      <UiInput label="Email" id="email" type="email" v-model="form.email" />
      <UiInput
        id="password"
        label="Пароль"
        required
        type="password"
        v-model="form.password" />
      <UiInput
        id="confirm-password"
        label="Подтверждение пароля"
        required
        type="password"
        v-model="form.confirm_password" />
    </form>

    <FormControls
      title="У вас есть аккаунт?"
      action-text="Войдите"
      :action="signUp"
      :disabled="!isButtonEnabled"
      :open-modal="ModalAuthorization" />
  </div>
</template>

<style scoped lang="scss">
.reg-modal {
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  &__form {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }
}
</style>
