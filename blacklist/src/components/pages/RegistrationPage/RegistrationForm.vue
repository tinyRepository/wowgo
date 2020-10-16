<template>
  <div>
    <h2 class="registration-form__title">
      Регистрация
    </h2>
    <form
      novalidate
      @submit.stop.prevent="tryToSendForm"
      class="registration-form"
    >
      <!-- <input-el
        class="registration-form__input"
        type="text"
        name="loginINN"
        inputId="login__INN"
        placeholder="Введите ИНН"
        label="ИНН"
      /> -->
      <input-el
        class="registration-form__input"
        type="text"
        name="name"
        v-model="form.name"
        inputId="login__first-name"
        placeholder="Введите имя"
        label="Имя"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="nameOfObject"
        v-model="form.nameOfObject"
        inputId="login__name-of-object"
        placeholder="Введите название объекта"
        label="Название объекта"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="surname"
        v-model="form.surname"
        inputId="login__surname"
        placeholder="Введите фамилию"
        label="Фамилия"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="legalAddress"
        inputId="login__legal-address"
        v-model="form.address"
        placeholder="Введите юридический адрес"
        label="Юридический адрес"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="middleName"
        v-model="form.middleName"
        inputId="login__middle-name"
        placeholder="Введите отчество"
        label="Отчество"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="email"
        v-model="form.email"
        inputId="login__email"
        placeholder="Введите электронную почта объекта"
        label="Электронная почта объекта"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="phone"
        mask="+7 (999) 999-99-99"
        v-model="form.phone"
        inputId="login__phone"
        placeholder="Введите телефон для связи"
        label="Телефон для связи"
      />
      <input-el
        class="registration-form__input"
        type="password"
        name="password"
        v-model="form.password"
        inputId="login__password"
        placeholder="Введите пароль"
        label="Пароль"
      />
      <div class="registration-form__bottom">
        <button-el
          type="submit"
          :disabled="loading"
          class="registration-form__button"
          >Зарегистрироваться</button-el
        >
        <div class="registration-form__notice">
          Нажимая на кнопку «Зарегистрироваться» вы соглашаетесь с
          <router-link to="/terms-of-use" class="registration-form__link"
            >правилами обработки персональных данных.</router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    form: {
      name: "",
      phone: "",
      email: "",
      surname: "",
      address: "",
      password: "",
      middleName: "",
      nameOfObject: ""
    }
  }),
  computed: {
    ...mapGetters("common", ["loading"])
  },
  methods: {
    ...mapActions("userData", ["registerUser"]),
    tryToSendForm() {
      this.registerUser(this.form);
    }
  }
};
</script>

<style lang="scss" scoped>
.registration-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  margin-top: 75px;
  grid-column-gap: 20px;
  &__notice {
    @include font(10px, $gray-color1);
    line-height: 12px;
  }
  &__input {
    margin-bottom: 75px;
    max-width: 325px;
  }
  &__link {
    text-decoration: none;
    color: $blue-color1;
  }
  &__button {
    width: 100%;
    font-size: 16px !important;
    padding: 17px 20px !important;
    max-width: 325px;
    color: $white-color1 !important;
    margin-bottom: 14px;
  }
  &__bottom {
    margin-top: -22px;
  }
  &__notice {
    max-width: 290px;
  }
}
</style>
