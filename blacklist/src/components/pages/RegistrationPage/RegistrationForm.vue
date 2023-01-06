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
      <!-- <base-input
        class="registration-form__input"
        type="text"
        name="loginINN"
        inputId="login__INN"
        placeholder="Введите ИНН"
        label="ИНН"
      /> -->
      <base-input
        v-model="$v.form.name.$model"
        :validationObj="$v.form.name"
        class="registration-form__input"
        type="text"
        name="name"
        inputId="login__first-name"
        placeholder="Введите имя"
        label="Имя"
        tabindex="1"
      />
      <base-input
        v-model="$v.form.nameOfObject.$model"
        :validationObj="$v.form.nameOfObject"
        class="registration-form__input"
        type="text"
        name="nameOfObject"
        inputId="login__name-of-object"
        placeholder="Введите название объекта"
        label="Название объекта"
        tabindex="5"
      />
      <base-input
        v-model="$v.form.surname.$model"
        :validationObj="$v.form.surname"
        class="registration-form__input"
        type="text"
        name="surname"
        inputId="login__surname"
        placeholder="Введите фамилию"
        label="Фамилия"
        tabindex="2"
      />
      <base-input
        v-model="$v.form.address.$model"
        :validationObj="$v.form.address"
        class="registration-form__input"
        type="text"
        name="legalAddress"
        inputId="login__legal-address"
        placeholder="Введите адрес"
        label="Адрес"
        tabindex="6"
      />
      <base-input
        v-model="$v.form.middleName.$model"
        :validationObj="$v.form.middleName"
        class="registration-form__input"
        type="text"
        name="middleName"
        inputId="login__middle-name"
        placeholder="Введите отчество"
        label="Отчество"
        tabindex="3"
      />
      <base-input
        v-model="$v.form.email.$model"
        :validationObj="$v.form.email"
        class="registration-form__input"
        type="text"
        name="email"
        inputId="login__email"
        placeholder="Введите электронную почта объекта"
        label="Электронная почта объекта"
        tabindex="7"
      />
      <base-input
        v-model="$v.form.phone.$model"
        :validationObj="$v.form.phone"
        class="registration-form__input"
        type="text"
        name="phone"
        mask="+7 (999) 999-99-99"
        inputId="login__phone"
        placeholder="Введите телефон для связи"
        label="Телефон для связи"
        tabindex="4"
      />
      <base-input
        v-model="$v.form.password.$model"
        :validationObj="$v.form.password"
        class="registration-form__input"
        type="password"
        name="password"
        inputId="login__password"
        placeholder="Введите пароль"
        label="Пароль"
        tabindex="8"
      />
      <div class="registration-form__bottom">
        <base-button
          type="submit"
          :disabled="showSpinner"
          class="registration-form__button"
        >
          Зарегистрироваться
        </base-button>
        <div class="registration-form__notice">
          Нажимая на кнопку «Зарегистрироваться» вы соглашаетесь с
          <router-link to="privacy-policy" class="registration-form__link"
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

  metaInfo() {
    return {
      title: "Регистрация"
    };
  },

  data() {
    return {
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
    };
  },

  computed: {
    ...mapGetters("common", ["showSpinner"])
  },

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

  methods: {
    ...mapActions("userData", ["registerUser"]),
    ...mapActions("common", ["showSpinnerForRequest"]),

    tryToSendForm() {
      this.validateForm().then(() => {
        this.showSpinnerForRequest(this.registerUser(this.form));
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
