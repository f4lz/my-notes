<script setup lang="ts">
import { useAttrs } from 'vue'
import type { UiTextareaInterface } from '@/types/UiTextarea'

withDefaults(defineProps<UiTextareaInterface>(), {
  placeholder: 'Введите текст',
})

const attrs = useAttrs()

const modelValue = defineModel<string>()
</script>

<template>
  <div class="textarea__wrapper">
    <label class="textarea__label" :for="id">{{ label }}</label>
    <textarea v-model="modelValue" v-bind="attrs" :placeholder :name="id" :id />

    <!-- Лимит по кол-ву символов -->
    <span v-if="attrs?.maxlength" class="textarea__limit">
      {{ `${modelValue?.length} / ${attrs.maxlength}` }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.textarea {
  &__wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  &__label {
    color: var(--color-gray);
    margin-left: 24px;
    margin-right: 24px;
  }

  &__limit {
    color: var(--color-gray);
    align-self: flex-end;
    margin-right: 24px;
  }

  &__visible-password {
    position: absolute;
    color: var(--color-green-light);
    border: none;
    background-color: transparent;
    top: 53%;
    transform: translate(50%, 50%);
    padding: 0;
    right: 40px;
    cursor: pointer;
  }
}
</style>
