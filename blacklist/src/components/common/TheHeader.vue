<template>
  <header class="header" :class="{ header_logged: checkUser }">
    <router-link to="/registration" class="header__logo-link">
      <span class="header__logo-text">Logo</span>
      <div class="header__logo" />
    </router-link>
    <div class="header__main" :class="{ header__main_logged: checkUser }">
      <template v-if="!checkUser">
        <router-link to="/registration" class="header__link"
          >Регистрация</router-link
        >
        <router-link to="/knowledge-base" class="header__link"
          >База знаний</router-link
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
    <base-button class="header__button" v-if="checkUser" @click="logoutUser"
      >Выйти</base-button
    >
    <base-button
      v-if="showEntryButton"
      class="header__button header__button_login"
      @click="goToLoginPage"
      >Войти</base-button
    >
    <div
      class="header__menu"
      :class="{ header__menu_opened: showMenu }"
      @click="toggleMenu"
    >
      <span />
      <span />
      <span />
    </div>

    <div class="menu-overlay" :class="{ 'menu-overlay_opened': showMenu }">
      <template v-if="checkUser">
        <router-link to="/black-list" class="header__link">Список</router-link>
        <router-link to="/rules" class="header__link">Правила</router-link>
        <router-link to="/knowledge-base" class="header__link"
          >База знаний</router-link
        >
        <router-link to="/support" class="header__link">Поддержать</router-link>

        <base-button
          v-if="checkUser"
          class="menu-overlay__button"
          @click="logoutUser"
          >Выйти</base-button
        >
      </template>

      <template v-else>
        <router-link to="/black-list" class="header__link">Список</router-link>
        <router-link to="/knowledge-base" class="header__link"
          >База знаний</router-link
        >
        <router-link to="/registration" class="header__link"
          >Регистрация</router-link
        >
        <router-link to="/login" class="header__link">Вход</router-link>
      </template>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      showMenu: false
    };
  },

  computed: {
    ...mapGetters("userData", ["checkUser"]),
    showEntryButton() {
      return !this.checkUser && this.$route.name !== "login";
    }
  },

  watch: {
    $route: {
      handler() {
        this.showMenu = false;

        const html = document.querySelector("html");
        html.classList.remove("stop");
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions("userData", ["logoutUser"]),
    toggleMenu() {
      this.showMenu = !this.showMenu;
      this.disableScroll();
    },

    disableScroll() {
      const html = document.querySelector("html");
      if (this.showMenu) {
        html.classList.add("stop");
      } else {
        html.classList.remove("stop");
      }
    },

    goToLoginPage() {
      this.$router.push("/login");
    }
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
  grid-template-rows: 1fr;
  background-color: $black-color2;
  user-select: none;

  @media screen and (max-width: 1100px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 1279px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(1, 1fr);
    height: auto;
    padding: 10px 0;

    & > * {
      justify-self: center;
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(5, 1fr);
    padding: 10px 0;
  }

  & > * {
    align-self: center;
  }

  &__logo {
    background: url("~@/assets/svg/logo.svg") no-repeat;
    width: 126px;
    height: 29px;

    @media screen and (max-width: 1279px) {
      background: url("~@/assets/svg/logo_mobile.svg") no-repeat;
      background-size: contain;

      width: 56px;
      height: 56px;
    }

    @media screen and (max-width: 768px) {
      width: 41px;
      height: 41px;
    }
  }

  &__logo-link {
    @media screen and (max-width: 1279px) {
      justify-content: center;
      display: flex;
      zoom: 0.7;
      grid-column: 3;
    }

    @media screen and (max-width: 768px) {
      zoom: 1;
    }
  }

  &__logo-text {
    display: none;
  }

  &__main {
    grid-column: 2 / 5;
    text-align: center;

    &_logged {
      @media screen and (max-width: 1000px) {
        display: flex;
        flex-direction: column;
      }
    }
    @media screen and (max-width: 1279px) {
      display: none;
    }
  }

  &__button {
    grid-column: 5 / 6;
    justify-self: end;

    @media screen and (max-width: 1279px) {
      padding: 5px 10px !important;
      margin-right: 12px;
      font-size: 12px;
    }

    &_login {
      @media screen and (min-width: 1280px) {
        display: none;
      }
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

    @media screen and (max-width: 1279px) {
      margin-bottom: 10px;
    }

    &.router-link-active {
      color: $brown-color1;
    }
  }

  @media screen and (max-width: 1279px) {
    &__menu {
      cursor: pointer;
      position: absolute;
      left: 15px;
      z-index: 101;

      & > span {
        width: 28px;
        height: 2px;
        margin-bottom: 5px;
        background: $white-color1;
        border-radius: 3px;
        display: block;
        transition: transform $transition/2;
        transform-origin: 23px 1px;
      }

      &_opened {
        & > span {
          transform: rotate(45deg) translate(-2px, -1px);
        }

        & > span:nth-last-child(3) {
          transform: rotate(-45deg) translate(0, -1px);
        }

        & > span:nth-last-child(2) {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }
      }
    }
  }
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: $gray-color5;
  z-index: 100;
  transform: translate(100%, 0);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__button {
    margin-top: 20px;
  }

  &_opened {
    transform: none;
  }
}
</style>
