<template>
  <div
    class="accordion__item"
    :class="{ accordion__item_opened: isOpened || isSingleElement }"
    @click="isOpened = !isOpened"
  >
    <div
      class="accordion__arrow"
      :class="{ accordion__arrow_opened: isOpened }"
    />
    <div class="accordion__name">
      {{ item.fullName }}
    </div>
    <div class="accordion__label">Сведения:</div>
    <div class="accordion__warning">
      Чтобы увидеть все данные войдите в систему
    </div>
    <div class="accordion__data-item">Статус: Гость</div>
    <div class="accordion__data-item">Дата рождения: скрыто</div>
    <div class="accordion__data-item">Город рождения: скрыто</div>
    <div class="accordion__data-item">Нарушение: скрыто</div>
    <div class="accordion__data-item">Комментарий: скрыто</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpened: false
    };
  },
  props: {
    item: Object,
    isSingleElement: Boolean
  }
};
</script>

<style lang="scss" scoped>
.accordion {
  &__item {
    height: 36px;
    overflow: hidden;
    cursor: pointer;

    position: relative;
    padding: 11px 14px 5px;
    margin: 5px 19px 10px;
    border-radius: 8px;
    max-width: 700px;
    background: $gray-color1;

    &_opened {
      height: auto;
    }
  }

  &__name {
    @include fontRubik(14px, $brown-color1);
    line-height: 17px;
    letter-spacing: -0.2px;
  }

  &__label {
    margin: 7px 0 3px;
    @include fontRubik(10px, $white-color2);
    line-height: 12px;
    letter-spacing: 0.3px;
  }

  &__warning {
    @include fontRubik(12px, $red-color2, 500);
    text-decoration-line: underline;
    letter-spacing: 0.1px;
    line-height: 14px;
    margin-bottom: 7px;
    margin-left: 1px;
  }

  &__data-item {
    @include fontRubik(10px, $white-color2);
    line-height: 12px;
    margin-bottom: 6px;
    letter-spacing: -0.1px;
  }

  &__arrow {
    cursor: pointer;
    position: absolute;
    top: 7px;
    right: 5px;
    background: url("~@/assets/svg/arrow_top.svg") no-repeat;
    background-size: contain;
    transition: $transition/2 transform;
    width: 24px;
    height: 24px;

    &_opened {
      transform: rotate(180deg);
    }
  }
}
</style>
