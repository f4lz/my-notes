<script setup lang="ts">
import { reactive } from 'vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiTextArea from '@/components/ui/UiTextArea.vue'
import { useNotesStore } from '@/store/notes'
import { useModalStore } from '@/store/modal'

const notesStore = useNotesStore()

const modalStore = useModalStore()

const form = reactive({
  title: '',
  content: '',
})

/** Функция для создания заметки */
function createNote() {
  notesStore.onCreateNote(form)
  modalStore.setModal(null)
}
</script>

<template>
  <div class="notes-create">
    <h2 class="notes-create__title">Добавление заметки</h2>

    <!-- Форма создания заметки -->
    <form class="notes-create__form">
      <UiInput
        id="notes-title"
        label="Название заметки"
        v-model="form.title"
        required
        maxlength="100"
        placeholder="Введите название" />
      <UiTextArea
        id="notes-content"
        label="Текст заметки"
        v-model="form.content"
        placeholder="Введите текст"
        maxlength="255"
        required />
    </form>

    <!-- Кнопка создания заметки -->
    <button
      type="button"
      class="button notes-create__button"
      @click="createNote">
      Добавить
    </button>
  </div>
</template>

<style scoped lang="scss">
.notes-create {
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  &__form {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }

  &__button {
    align-self: flex-end;
  }
}
</style>
