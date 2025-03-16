<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import UiModal from '@/components/ui/UiModal.vue'
import { useAuthStore } from '@/store/auth'
import { useModalStore } from '@/store/modal'

const authStore = useAuthStore()

const modalStore = useModalStore()

/** Проверка пользователя на авторизованность */
const accessToken = localStorage.getItem('accessToken')
if (accessToken) authStore.signIn()
</script>

<template>
  <div class="app__wrapper">
    <div class="'app'" :class="{ 'app--background': modalStore.currentModal }">
      <TheHeader />
      <RouterView />
    </div>
    <UiModal />
  </div>
</template>

<style scoped lang="scss">
.app {
  &--background {
    opacity: 0.7;
    pointer-events: none;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
