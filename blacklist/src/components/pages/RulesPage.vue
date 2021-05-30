<template>
  <div class="rules">
    <div class="rules__desciption">
      <div class="rules__item">
        <div class="rules__title">
          Не отказывайте человеку в заселении, ссылаясь на чёрный список.
        </div>
        <div class="rules__text">
          Прямой отказ потребителю в заключении публичного договора, считается
          неправомерным действием.
        </div>
      </div>
      <div class="rules__item">
        <div class="rules__title">
          Не добавляйте человека в список, если он не дал на это своё согласие.
        </div>
        <div class="rules__text">
          Гость должен подписать правила проживания и поставить отметку, что он
          согласен на обработку персональных данных.
        </div>
      </div>
    </div>
    <div class="rules__image" />
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: "Правила"
    };
  }
};
</script>

<style lang="scss" scoped>
.rules {
  max-width: 1605px;
  min-height: calc(100vh - #{$header-height});
  display: flex;
  padding: 100px 20px 60px;
  justify-content: space-between;

  @media screen and (max-width: 1500px) {
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    padding: 20px;
  }

  &__image {
    @include attachImage("rules", 896px, 640px);

    @media screen and (max-width: 768px) {
      background-size: contain;
      max-width: 100%;
      height: 100%;
      min-height: 300px;
      margin: auto;
      background-position-x: center;
    }
  }

  &__title {
    @include fontSans(17px, $white-color1, bold);
    line-height: 22px;
    margin-bottom: 20px;
  }

  &__text {
    @include fontSans(16px, rgba(255, 255, 255, 0.48), 300);
    line-height: 22px;
  }

  &__item {
    max-width: 416px;
    margin-bottom: 48px;
  }
}
</style>
