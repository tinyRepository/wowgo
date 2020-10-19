<template>
  <div class="contact">
    <div class="contact__info">
      <div class="contact__info-img" />
      <div class="contact__info-title">
        Обратите внимание. Доступ к сайту предоставляется только реальным
        владельцам отелей, хостелов гостиниц и аппартаментов
      </div>
    </div>
    <div class="contact__form">
      <registration-form v-if="isRegistrationPage" />
      <authorization-form v-else-if="isLoginPage" />
    </div>
  </div>
</template>

<script>
import RegistrationForm from "./RegistrationForm";
import AuthorizationForm from "./AuthorizationForm";
export default {
  components: {
    RegistrationForm,
    AuthorizationForm
  },
  computed: {
    isRegistrationPage() {
      return this.$route.meta.isRegistrationPage;
    },
    isLoginPage() {
      return this.$route.meta.isLoginPage;
    }
  },
  methods: {
    tryToSendForm() {}
  }
};
</script>

<style lang="scss" scoped>
.contact {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  padding: 77px 80px;
  @media screen and (max-width: 1300px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    & > * {
      justify-self: center;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 70px 20px;
  }

  @media screen and (max-width: 425px) {
    padding: 70px 10px;
  }
  &__title {
    text-align: center;
  }
  &__form {
    background-color: $white-color1;
    border-radius: 10px;
    padding: 62px 62px 41px;
    max-width: 879px;
    margin-top: -11px;
    margin-left: 2px;
    @media screen and (max-width: 670px) {
      padding: 32px;
    }
    @media screen and (max-width: 450px) {
      padding: 20px;
      width: 100%;
    }
  }
  &__form-title {
    @include font(36px, $black-color2);
    margin-top: 0;
    line-height: 42px;
  }
  &__info {
    @media screen and (max-width: 1300px) {
      display: none;
    }
  }
  &__info-img {
    @include attachImage("hotel", 653px, 654px);
    @media screen and (max-width: 1500px) {
      background-size: 600px;
    }
    @media screen and (min-width: 1301px) and (max-width: 1499px) {
      width: 100%;
      background-size: contain;
    }
  }
  &__info-title {
    @include font(24px, $white-color2);
    margin-top: 59px;
    line-height: 28px;
    max-width: 631px;
    text-align: center;
  }
}
</style>
