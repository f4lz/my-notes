<script setup lang="ts">
import ModalNoteCreate from '@/components/modals/ModalNoteCreate.vue'
import NotesCard from '@/components/notes/NotesCard.vue'
import { useModalStore } from '@/store/modal'
import { useNotesStore } from '@/store/notes'

const notesStore = useNotesStore()

const modalStore = useModalStore()

notesStore.getNotesList()
</script>

<template>
  <div class="notes-view">
    <!-- Список заметок -->
    <div v-if="notesStore.notes.length">
      <div class="notes-view__cards">
        <NotesCard :note v-for="note in notesStore.notes" :key="note.id" />
      </div>
    </div>

    <!-- Кнопка открытия модального окна для создания заметки -->
    <button
      @click.stop="modalStore.setModal(ModalNoteCreate)"
      class="button button--rounded notes-view__button"
      type="button">
      <img src="@/assets/icons/add.svg" alt="Добавить заметку" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.notes-view {
  &__button {
    position: fixed;
    box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.3);
    bottom: 40px;
    right: 40px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 40px;
  }
}

@media (max-width: 1366px) {
  .notes-view {
    &__cards {
      gap: 20px;
    }
  }
}

@media (max-width: 768px) {
  .notes-view {
    &__cards {
      grid-template-columns: minmax(0, 1fr);
    }
  }
}
</style>
