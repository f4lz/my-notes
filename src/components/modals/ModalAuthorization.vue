<script setup lang="ts">
import { reactive, computed } from 'vue'
import UiInput from '@/components/ui/UiInput.vue'
import FormControls from '@/components/FormControls.vue'
import ModalRegistration from '@/components/modals/ModalRegistration.vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

/** Функция для входа пользователя в аккаунт */
function signIn() {
  authStore.getAuthToken(form)
}

/** Влключена ли кнопка `action` */
const isButtonEnabled = computed(() =>
  Object.values(form).every((value) => value)
)
</script>

<template>
  <div class="auth-modal">
    <h2 class="auth-modal__title">Вход в ваш аккаунт</h2>

    <!-- Форма для авторизации -->
    <form class="auth-modal__form">
      <UiInput
        id="email"
        label="Email"
        required
        type="email"
        v-model="form.email" />
      <UiInput
        id="password"
        label="Пароль"
        required
        type="password"
        v-model="form.password" />
    </form>

    <FormControls
      title="У вас нет аккаунта?"
      action-text="Зарегистрируйтесь"
      :action="signIn"
      :disabled="!isButtonEnabled"
      :open-modal="ModalRegistration" />
  </div>
</template>

<style scoped lang="scss">
.auth-modal {
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
