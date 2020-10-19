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
        v-model="$v.form.name.$model"
        :validationObj="$v.form.name"
        inputId="login__first-name"
        placeholder="Введите имя"
        label="Имя"
        tabindex="1"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="nameOfObject"
        v-model="$v.form.nameOfObject.$model"
        :validationObj="$v.form.nameOfObject"
        inputId="login__name-of-object"
        placeholder="Введите название объекта"
        label="Название объекта"
        tabindex="5"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="surname"
        v-model="$v.form.surname.$model"
        :validationObj="$v.form.surname"
        inputId="login__surname"
        placeholder="Введите фамилию"
        label="Фамилия"
        tabindex="2"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="legalAddress"
        inputId="login__legal-address"
        v-model="$v.form.address.$model"
        :validationObj="$v.form.address"
        placeholder="Введите адрес"
        label="Адрес"
        tabindex="6"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="middleName"
        v-model="$v.form.middleName.$model"
        :validationObj="$v.form.middleName"
        inputId="login__middle-name"
        placeholder="Введите отчество"
        label="Отчество"
        tabindex="3"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="email"
        v-model="$v.form.email.$model"
        :validationObj="$v.form.email"
        inputId="login__email"
        placeholder="Введите электронную почта объекта"
        label="Электронная почта объекта"
        tabindex="7"
      />
      <input-el
        class="registration-form__input"
        type="text"
        name="phone"
        mask="+7 (999) 999-99-99"
        v-model="$v.form.phone.$model"
        :validationObj="$v.form.phone"
        inputId="login__phone"
        placeholder="Введите телефон для связи"
        label="Телефон для связи"
        tabindex="4"
      />
      <input-el
        class="registration-form__input"
        type="password"
        name="password"
        v-model="$v.form.password.$model"
        :validationObj="$v.form.password"
        inputId="login__password"
        placeholder="Введите пароль"
        label="Пароль"
        tabindex="8"
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
import validateFormMixin from "@/mixins/validateForm";
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import { passwordMinLength } from "@/utils/config";

const phoneIsFilled = val => !val.includes("_");

export default {
  mixins: [validateFormMixin],
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
  validations: {
    form: {
      name: {
        required
      },
      surname: {
        required
      },
      middleName: {
        required
      },
      nameOfObject: {
        required
      },
      address: {
        required
      },
      phone: {
        required,
        phoneIsFilled
      },
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
    ...mapGetters("common", ["loading"])
  },
  methods: {
    ...mapActions("userData", ["registerUser"]),
    tryToSendForm() {
      this.validateForm().then(() => {
        this.registerUser(this.form);
      });
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
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-column-gap: 0;
  }
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
  &__title {
    @media screen and (max-width: 670px) {
      text-align: center;
    }
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
