import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, markRaw } from 'vue'

export const useModalStore = defineStore('modal', () => {
  /** Текущее модальное окно */
  const currentModal = ref<object | null>(null)

  /** Функция для установки текущего модального окна */
  function setModal(modal: object | null) {
    if (!modal) currentModal.value = null
    else currentModal.value = markRaw(modal)
  }

  return {
    currentModal,
    setModal,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot))
}
