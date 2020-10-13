<template>
  <div class="success-registration">
    <div class="success-registration__card">
      <div class="success-registration__card-title">
        Уважаемый, Владимир Владимирович!
      </div>
      <div class="success-registration__description">
        <p class="success-registration__paragraph">
          Спасибо Вам за регистрацию на сайте.
        </p>
        <p class="success-registration__paragraph">
          Письмо с подтверждением было выслано вам на почту нажмите на ссылку
          чтобы подтвердить свой Email
        </p>
        <p class="success-registration__paragraph">
          После подтверждения, вам перезвонит наш менеджер, по номеру который вы
          указали при регистрации.
        </p>
      </div>
      <ol class="success-registration__list">
        <li class="success-registration__list-item">
          Он проверит введёную вами информацию
        </li>
        <li class="success-registration__list-item">
          Расскажет о тонкостях работы с программой «List»
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.success-registration {
  min-height: calc(100vh - #{$header-height});
  display: flex;
  align-items: center;
  justify-content: center;
  &__card {
    max-width: 880px;
    margin: auto;
    height: 408px;
    background: $white-color1;
    border-radius: 10px;
    padding: 30px 65px;
  }
  &__card-title {
    @include fontRubik(28px, $black-color2, 500);
    line-height: 34px;
    margin-bottom: 34px;
  }
  &__list {
    list-style-type: none;
    padding: 0;
    display: flex;
    position: relative;
    margin-top: 36px;
    counter-reset: num;
  }
  &__paragraph {
    @include fontRubik(16px, $black-color2, 300);
    line-height: 22px;
  }
  &__list-item {
    position: relative;
    display: flex;
    align-items: flex-start;
    max-width: 326px;
    @include fontRubik(16px, $black-color2, 300);
    border-bottom: 1px solid $gray-color3;
    padding-bottom: 22px;
    &::before {
      margin-right: 16px;
      content: counter(num);
      counter-increment: num;
      @include fontRubik(22px, $brown-color1, 300);
      border: 2px solid;
      border-radius: 50px;
      width: 33px;
      height: 33px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
    &:first-of-type {
      margin-right: 57px;
    }
  }
}
</style>
