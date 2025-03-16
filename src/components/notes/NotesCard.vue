<script setup lang="ts">
import { type Note } from '@/types/Notes'
import { useNotesStore } from '@/store/notes'

defineProps<{
  note: Note
}>()

const notesStore = useNotesStore()
</script>

<template>
  <div class="notes-card">
    <h4 class="notes-card__title">{{ note.title }}</h4>
    <p class="notes-card__description">
      {{ note.content }}
    </p>
    <button
      class="notes-card__button"
      @click="notesStore.onRemoveNote(note.id)">
      <img src="@/assets/icons/x-mark.svg" alt="Удалить" />
      <p>Удалить</p>
    </button>
  </div>
</template>

<style scoped lang="scss">
.notes-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-green-light);
  border-radius: 12px;
  box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.4);
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    border: 14px solid transparent;
    clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
    background-color: var(--color-green-middle);
    transform: rotate(0deg);
    border-radius: 0 0 0 8px;
  }

  &::before {
    content: '';
    position: absolute;
    right: -20px;
    top: -20px;
    border: 20px solid transparent;
    border-top: 20px solid var(--color-dark);
    transform: rotate(225deg);
  }

  &__title {
    word-wrap: break-word;
    padding: 20px 28px 20px;
    border-bottom: 1px solid var(--color-green-middle);
  }

  &__description {
    word-wrap: break-word;
    max-width: 424px;
    padding: 20px 28px 28px;
    font-size: 16px;
    line-height: 22px;
    color: var(--color-gray-dark);
  }

  &__button {
    font-family: 'Montserrat', sans-serif;
    display: flex;
    border: none;
    padding: 20px 32px;
    column-gap: 12px;
    align-self: flex-end;
    background-color: transparent;
    color: var(--color-white);
    cursor: pointer;
    margin-top: auto;
  }
}
</style>
