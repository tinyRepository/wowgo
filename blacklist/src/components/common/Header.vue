<template>
  <div class="header">
    <router-link to="/registration">
      <div class="header__logo" />
    </router-link>
    <div class="header__main">
      <router-link to="/registration" class="header__link"
        >Регистрация</router-link
      >
      <router-link to="/login" class="header__link">Вход</router-link>
    </div>
    <button-el class="header__button" v-if="loginInfo"
      >Добавить в список</button-el
    >
  </div>
</template>

<script>
export default {
  data: () => ({
    loginInfo: false
  })
};
</script>

<style lang="scss" scoped>
.header {
  height: $header-height;
  border-bottom: 1px solid $gray-color2;
  display: grid;
  padding: 0 71px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  background-color: $black-color2;
  user-select: none;
  & > * {
    align-self: center;
  }
  &__logo {
    background: url("~@/assets/svg/logo.svg") no-repeat;
    width: 126px;
    height: 29px;
  }
  &__main {
    grid-column: 3 / 4;
    text-align: center;
  }
  &__button {
    grid-column: 5 / 6;
    justify-self: end;
  }
  &__link {
    margin: 0 40px;
    @include fontRubik(17px, $white-color1, 500);
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 1px;
    text-decoration: none;
    &.router-link-active {
      color: $brown-color1;
    }
  }
}
</style>
