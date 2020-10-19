<template>
  <div class="header">
    <router-link to="/registration">
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
        <div @click="wip" class="header__link">
          Законодательство
        </div>
        <div @click="wip" class="header__link">Правила</div>
      </template>
    </div>
    <button-el class="header__button" v-if="checkUser" @click="logoutUser"
      >Выйти</button-el
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("userData", ["checkUser"])
  },
  methods: {
    ...mapActions("userData", ["logoutUser"])
  }
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
    &_logged {
      grid-column: 2 / 5;
    }
  }
  &__button {
    grid-column: 5 / 6;
    justify-self: end;
  }
  &__link {
    cursor: pointer;
    display: initial;
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
