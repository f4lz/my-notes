<script setup lang="ts"></script>

<template>
  <div class="promo">
    <div class="promo__text">
      <h1>Мои заметки</h1>
      <h3 class="promo__description">
        Не забывай о важном, храни его в облаке.
      </h3>
    </div>
    <img class="promo__img" src="@/assets/promo-img.png" alt="Мои заметки" />
  </div>
</template>

<style scoped lang="scss">
.promo {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__text {
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    max-width: 642px;
  }

  &__img {
    width: 50%;
  }

  &__description {
    color: var(--color-gray);
    max-width: 394px;
  }
}

@media (max-width: 1280px) {
  .promo {
    flex-direction: column;
    gap: 20px;
    text-align: center;

    &__img {
      width: 100%;
    }

    &__description {
      color: var(--color-gray);
      max-width: none;
    }
  }
}
</style>
