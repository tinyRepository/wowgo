<template>
  <header class="header" :class="{ header_logged: checkUser }">
    <router-link to="/registration" class="header__logo-link">
      <div class="header__logo" />
    </router-link>
    <div class="header__main" :class="{ header__main_logged: checkUser }">
      <template v-if="!checkUser">
        <router-link to="/registration" class="header__link"
          >Регистрация</router-link
        >
        <router-link to="/login" class="header__link">Вход</router-link>
      </template>
      <template v-else>
        <router-link to="/black-list" class="header__link">Список</router-link>
        <router-link to="/rules" class="header__link">Правила</router-link>
        <router-link to="/knowledge-base" class="header__link"
          >База знаний</router-link
        >
        <router-link to="/support" class="header__link">Поддержать</router-link>
      </template>
    </div>
    <button-el class="header__button" v-if="checkUser" @click="logoutUser"
      >Выйти</button-el
    >
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('userData', ['checkUser']),
  },
  methods: {
    ...mapActions('userData', ['logoutUser']),
  },
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
  @media screen and (max-width: 1100px) {
    padding: 0 20px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    padding: 20px;
    height: 125px;
    & > * {
      justify-self: center;
    }
  }
  & > * {
    align-self: center;
  }
  &_logged {
    @media screen and (max-width: 768px) {
      height: 200px;
    }
  }
  &__logo {
    background: url('~@/assets/svg/logo.svg') no-repeat;
    width: 126px;
    height: 29px;
  }
  &__logo-link {
    @media screen and (max-width: 768px) {
      justify-content: center;
      display: flex;
    }
  }
  &__main {
    grid-column: 3 / 4;
    text-align: center;
    &_logged {
      grid-column: 2 / 5;
      @media screen and (max-width: 1000px) {
        display: flex;
        flex-direction: column;
      }
    }
    @media screen and (max-width: 768px) {
      grid-column: auto;
      display: flex;
      flex-direction: column;
      margin: 10px 0;
    }
  }
  &__button {
    grid-column: 5 / 6;
    justify-self: end;
    @media screen and (max-width: 768px) {
      grid-column: auto;
      justify-self: center;
    }
  }
  &__link {
    cursor: pointer;
    display: initial;
    margin: 0 40px;
    @include fontRubik(17px, $white-color1, 300);
    line-height: 22px;
    letter-spacing: 1px;
    text-decoration: none;
    &.router-link-active {
      color: $brown-color1;
    }
  }
}
</style>
