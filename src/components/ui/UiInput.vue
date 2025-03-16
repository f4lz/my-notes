<script setup lang="ts">
import { useAttrs, computed, ref } from 'vue'
import type { UiInputInterface } from '@/types/UiInput'

const props = withDefaults(defineProps<UiInputInterface>(), {
  type: 'text',
  placeholder: 'Введите текст',
})

const attrs = useAttrs()

/** Показывать ли пароль */
const isPasswordShown = ref<boolean>(false)

/** Тип формы */
const inputType = computed(() => {
  if (props.type === 'password') {
    return isPasswordShown.value ? 'text' : 'password'
  }
  return props.type
})

const modelValue = defineModel<string>()
</script>

<template>
  <div class="input__wrapper">
    <label class="input__label" :for="id">{{ label }}</label>
    <input
      v-model="modelValue"
      v-bind="attrs"
      :type="inputType"
      :placeholder
      :name="id"
      :id />

    <!-- Лимит по кол-ву символов -->
    <span v-if="attrs?.maxlength" class="input__limit">
      {{ `${modelValue?.length} / ${attrs.maxlength}` }}
    </span>

    <!-- Кнопка для изменение видимости пароля -->
    <button
      v-if="type === 'password'"
      @click="isPasswordShown = !isPasswordShown"
      class="input__visible-password"
      type="button">
      <img src="@/assets/icons/eye.svg" alt="Показать пароль" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.input {
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
