import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { type Note } from '@/types/Notes'
import useFetch from '@/composables/useFetch'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])

  /** Список заметок */
  async function getNotesList() {
    notes.value = await useFetch<Note[]>({
      url: 'api/notes',
    })
  }

  /** Создать заметку */
  async function onCreateNote(note: Omit<Note, 'id'>) {
    const createdNote = await useFetch<Note>({
      url: 'api/notes',
      method: 'POST',
      body: note,
    })

    notes.value.push(createdNote)
  }

  /** Удалить заметку */
  async function onRemoveNote(id: number) {
    await useFetch<Note[]>({
      url: `api/notes/${id}`,
      method: 'DELETE',
    })

    notes.value = notes.value.filter((note) => note.id !== id)
  }

  return {
    getNotesList,
    onCreateNote,
    onRemoveNote,
    notes,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}
