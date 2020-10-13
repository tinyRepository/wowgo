<template>
  <div class="authorization">
    <h2 class="authorization__title">Вход</h2>
    <form
      novalidate
      @submit.stop.prevent="tryToSendForm"
      class="authorization__form"
    >
      <input-el
        class="authorization__input"
        type="text"
        name="loginINN"
        inputId="login__INN"
        placeholder="Введите ИНН"
        label="ИНН"
      />
      <input-el
        class="authorization__input"
        type="password"
        name="password"
        inputId="login__password"
        placeholder="Введите пароль"
        label="Пароль"
      />
      <button-el class="authorization__button">Войти</button-el>
      <div class="authorization__remeber">
        <base-switch class="authorization__switcher"
          >Запомнить этот компьютер</base-switch
        >
      </div>
    </form>
    <div class="authorization__bottom">
      <router-link to="/registration" class="authorization__link"
        >Регистрация</router-link
      >
      <router-link to="/reset-password" class="authorization__link"
        >Забыли пароль?</router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.authorization {
  text-align: center;
  &__title {
    @include fontRubik(36px, $black-color2, 300);
    line-height: 18px;
    margin-top: 177px;
    margin-bottom: 71px;
  }
  &__form {
    max-width: 506px;
    margin: auto;
  }
  &__button {
    width: 325px;
    margin-top: -15px;
    font-size: 16px !important;
    padding: 17px 20px !important;
    color: $white-color1 !important;
    margin-bottom: 44px;
  }
  &__remember-computer {
    @include fontRubik(16px, $black-color1, 300);
    line-height: 18px;
  }
  &__input {
    margin-bottom: 59px;
  }
  &__bottom {
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
  }
  &__remember {
    @include fontRubik(16px, $black-color1, 300);
    line-height: 18px;
  }
  &__switcher {
    display: flex;
    justify-content: center;
  }
  &__link {
    @include fontRubik(16px, $blue-color1, 300);
    line-height: 18px;
    text-decoration: none;
  }
}
</style>
