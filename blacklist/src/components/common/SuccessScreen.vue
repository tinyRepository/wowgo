<template>
  <transition name="fade" mode="out-in">
    <div class="success-screen">
      <div class="success-screen__overlay" />
      <div class="success-screen__content">
        <div>
          <h1 class="success-screen__title">
            Нежелательный гость успешно добавлен
          </h1>
          <p class="success-screen__description">
            Данная платформа никогда не будет платной, но её поддержание и
            развитие стоит денег.
          </p>
          <p class="success-screen__description">
            Если вы хотите чтобы проект жил - мы добавили возможность
            пожертвовать любую сумму.
          </p>

          <div class="success-screen__buttons">
            <button-el class="success-screen__button" @click="close"
              >Закрыть</button-el
            >
            <button-el
              class="success-screen__button success-screen__button_red"
              @click="goToDonatePage"
            >
              Пожертовать
            </button-el>
          </div>
          <checkbox-el id="checkbox" v-model="checked"
            >Больше не показывать данное сообщение</checkbox-el
          >
        </div>
        <div class="success-screen__villain" />
      </div>
    </div>
  </transition>
</template>

<script>
import { donateUrl } from "@/utils/config";
export default {
  data() {
    return {
      checked: false
    };
  },
  methods: {
    goToDonatePage() {
      window.open(donateUrl);
    },
    close() {
      this.$emit("close");

      if (this.checked) {
        localStorage.setItem("hidePopup", "true");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.success-screen {
  display: flex;
  position: fixed;
  background: rgba(255, 255, 255, 0.1);
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;

  &__title {
    @include fontRubik(20px, $white-color2);
    line-height: 16px;
    margin-top: 36px;
    margin-bottom: 23px;
  }

  &__description {
    @include fontRubik(16px, $white-color2, 300);
    max-width: 370px;
  }

  &__villain {
    width: 182px;
    height: 303px;
    background: url("~@/assets/svg/villain.svg");
    margin-left: auto;
    margin-right: 12px;
    margin-top: -5px;
  }

  &__overlay {
    width: 100%;
    position: absolute;
    height: 100%;
  }

  &__content {
    display: flex;
    background: $black-color2;
    border-radius: 5px;
    padding: 30px 54px;
    width: 100%;
    max-width: 748px;
    max-height: 363px;
    margin: auto;
    z-index: 1;
  }

  &__button {
    margin-right: 10px;
    padding: 15px 21px !important;

    color: $white-color1 !important;
    font-weight: 300 !important;

    box-shadow: 0px 4px 4px rgba(50, 50, 71, 0.08),
      0px 4px 8px rgba(50, 50, 71, 0.06) !important;

    &_red {
      background: $red-color2 !important;
    }
  }

  &__buttons {
    margin-top: 49px;
    margin-bottom: 22px;
  }
}
</style>
