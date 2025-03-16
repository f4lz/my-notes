<script setup lang="ts">
import { ref } from 'vue'
import ModalAuthorization from '@/components/modals/ModalAuthorization.vue'
import { useModalStore } from '@/store/modal'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const modalStore = useModalStore()

const showSignOutPopup = ref<boolean>(false)

/** Функция закрывает попап и выполняет выход пользователя из аккаунта */
function signOut() {
  authStore.signOut()
  showSignOutPopup.value = false
}
</script>

<template>
  <header class="header">
    <!-- Логотип -->
    <picture class="header__logo">
      <source srcset="@/assets/logo-mobile.svg" media="(max-width: 360px)" />
      <img src="@/assets/logo.svg" alt="MyNotes" />
    </picture>

    <!-- Аккаунт пользователя -->
    <div v-if="authStore.uid" class="header__user">
      <span class="header__user-email">{{ authStore.email }}</span>
      <button
        @click="showSignOutPopup = !showSignOutPopup"
        class="header__user-logo">
        <img src="@/assets/icons/user.svg" alt="Пользователь" />
      </button>
      <div v-if="showSignOutPopup" class="header__user-popup">
        <button class="link" @click="signOut">Выйти</button>
      </div>
    </div>

    <!-- Кнопка для авторизации -->
    <button
      v-else
      class="button"
      type="button"
      @click.stop="modalStore.setModal(ModalAuthorization)">
      <img src="@/assets/icons/sign-in.svg" alt="Вход в аккаунт" />
      <p>Вход</p>
    </button>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 43px 0;

  &__user {
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 12px;

    &-logo {
      background-color: var(--color-dark-middle);
      border-radius: 100%;
      width: 56px;
      height: 56px;
      padding: 14px 18px;
      border: none;
      cursor: pointer;
    }

    &-popup {
      z-index: 1;
      position: absolute;
      box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.3);
      top: 80px;
      right: 0;
      background-color: var(--color-dark-middle);
      padding: 40px;
      border-radius: 12px;

      &::after {
        content: '';
        position: absolute;
        right: 18px;
        top: -18px;
        border: 10px solid transparent;
        border-bottom: 10px solid var(--color-dark-middle);
      }
    }
  }
}

@media (max-width: 576px) {
  .header {
    column-gap: 22px;

    &__user {
      &-email {
        display: none;
      }
    }
  }
}
</style>
