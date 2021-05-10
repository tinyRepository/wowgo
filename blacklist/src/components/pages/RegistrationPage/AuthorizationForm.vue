<template>
  <div class="authorization">
    <h2 class="authorization__title">Вход</h2>
    <form
      novalidate
      @submit.stop.prevent="tryToSendForm"
      class="authorization__form"
    >
      <input-el
        v-model="$v.form.email.$model"
        :validationObj="$v.form.email"
        class="authorization__input"
        type="email"
        name="loginEmail"
        inputId="login__email"
        placeholder="Введите email"
        label="Email"
      />
      <input-el
        v-model="$v.form.password.$model"
        :validationObj="$v.form.password"
        class="authorization__input"
        type="password"
        name="password"
        inputId="login__password"
        placeholder="Введите пароль"
        label="Пароль"
      />
      <div class="authorization__submit-status">{{ beautifyErrorMessage }}</div>
      <button-el type="submit" class="authorization__button">Войти</button-el>
      <div class="authorization__remeber">
        <!-- TODO implement -->
        <!-- <base-switch class="authorization__switcher"
          >Запомнить этот компьютер</base-switch
        > -->
      </div>
    </form>
    <div class="authorization__bottom">
      <router-link to="/registration" class="authorization__link"
        >Регистрация</router-link
      >
      <div click="wip" class="authorization__link">Забыли пароль?</div>
    </div>
  </div>
</template>

<script>
import validateFormMixin from "@/mixins/validateForm";
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import { passwordMinLength } from "@/utils/config";

export default {
  mixins: [validateFormMixin],
  data: () => ({
    form: {
      email: "",
      password: ""
    },
    submitStatus: null
  }),
  validations: {
    form: {
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(passwordMinLength)
      }
    }
  },
  computed: {
    status() {
      return this.submitStatus && this.submitStatus.code;
    },
    beautifyErrorMessage() {
      switch (this.status) {
        case "auth/user-not-found":
          return "Пользователя не существует. Возможно, он был удален.";
        case "auth/wrong-password":
          return "Неверный пароль.";
        case "auth/too-many-requests":
          return "Доступ к этой учетной записи был временно отключен из-за многих неудачных попыток входа в систему.";
        default:
          return "";
      }
    }
  },
  methods: {
    ...mapActions("userData", ["loginUser"]),
    tryToSendForm() {
      this.submitStatus = null;
      this.validateForm().then(() => {
        this.loginUser(this.form).catch(err => {
          this.submitStatus = err;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.authorization {
  text-align: center;
  &__title {
    @include fontRubik(36px, $black-color2, 300);
    line-height: 18px;
    margin-top: 177px;
    margin-bottom: 71px;
    @media screen and (max-width: 1300px) {
      margin-top: 70px;
    }
    @media screen and (max-width: 450px) {
      margin-top: 40px;
    }
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
    @media screen and (max-width: 450px) {
      width: 100%;
    }
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
    @media screen and (max-width: 450px) {
      margin-top: 20px;
    }
  }
  &__remember {
    @include fontRubik(16px, $black-color1, 300);
    line-height: 18px;
  }
  &__switcher {
    display: flex;
    justify-content: center;
  }
  &__submit-status {
    @include fontRubik(15px, $red-color1, 300);
    position: relative;
    top: -33px;
  }
  &__link {
    cursor: pointer;
    @include fontRubik(16px, $blue-color1, 300);
    line-height: 18px;
    text-decoration: none;
  }
}
</style>
