<script lang="ts" setup>
import { useTemplateRef, onMounted, onUnmounted } from 'vue'
import { useModalStore } from '@/store/modal'

const modalStore = useModalStore()

const modalRef = useTemplateRef('modal')

/** Функция закрытия модального окна при клике извне него */
function onClickOutside(event: Event) {
  if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    modalStore.currentModal = null
  }
}

/** Функция закрытия модального окна при клике извне него */
function closeModal(e: KeyboardEvent) {
  if (e.code !== 'Escape') return
  modalStore.setModal(null)
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', closeModal)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', closeModal)
})
</script>

<template>
  <Transition name="opacity">
    <div v-if="modalStore.currentModal" ref="modal" class="modal">
      <div class="modal__content">
        <!-- Кнопка закрытия модального окна -->
        <button
          class="button button--rounded modal__button"
          @click="modalStore.setModal(null)">
          <img src="@/assets/icons/x-mark.svg" alt="Закрыть" />
        </button>

        <component :is="modalStore.currentModal" />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.2s ease;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}

.modal {
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  background-color: var(--color-dark-middle);
  border-radius: 40px;
  transform: translate(-50%, -50%);
  max-width: 780px;
  width: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    justify-content: center;
    padding: 80px;
  }

  &__button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}

@media (max-width: 1366px) {
  .modal__content {
    padding: 56px;
  }
}

@media (max-width: 480px) {
  .modal__content {
    padding: 90px 16px;
  }
}
</style>
