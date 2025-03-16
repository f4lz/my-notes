<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { useModalStore } from '@/store/modal'

defineProps<{
  title: string
  actionText: string
  openModal: object
  disabled: boolean
  action: (e: Event) => void
}>()

const authStore = useAuthStore()

const modalStore = useModalStore()
</script>

<template>
  <div class="form-controls">
    <!-- Кнопки действия -->
    <div class="form-controls__inner">
      <div class="form-controls__actions">
        <span>
          {{ title }}
        </span>
        <button @click.stop="modalStore.setModal(openModal)" class="link">
          {{ actionText }}
        </button>
      </div>
      <button
        @click="action"
        type="button"
        class="button form-controls__button"
        :disabled>
        Войти
      </button>
    </div>

    <!-- Список ошибок с сервера -->
    <div v-if="authStore.errors?.length" class="form-controls__errors">
      <span v-for="error in authStore.errors" :key="error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-controls {
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-gray);
  }

  &__actions {
    display: flex;
    align-items: center;
    column-gap: 4px;
  }

  &__errors {
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 116, 97, 0.1);
    color: rgba(255, 116, 97);
    padding: 8px 20px;
    border-radius: 24px;
  }
}

@media (max-width: 360px) {
  .form-controls {
    &__inner {
      flex-direction: column;
      row-gap: 12px;
    }

    &__actions {
      order: 2;
    }

    &__button {
      order: 1;
      width: 100%;
    }
  }
}
</style>
