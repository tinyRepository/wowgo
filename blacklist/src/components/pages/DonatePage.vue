<template>
  <div class="donate">
    <div class="donate__description">
      <h1 class="donate__title">
        Сделаем гостиничный бизнес безопаснее вместе
      </h1>
      <p class="donate__paragraph">
        Мы - молодая, но перспективная команда, которая чувствует в себе
        творческий потенциал. Сейчас ищем поддержку инвесторов для создания PMS.
      </p>
      <p class="donate__paragraph">
        Это наш первый проект, но мы вкладываем в него свою душу и возлагаем
        большие надежды, чтобы он развивался в правильном направлении.
      </p>
      <p class="donate__paragraph">
        Мы прикладываем максимум усилий, чтобы реализовать задумки в рамках
        проекта, а потому принимаем пожертвования для поддержания проекта. Будем
        рады сотрудничеству!
      </p>
      <button-el @click="goToDonatePage" red class="donate__btn"
        >Поддержать</button-el
      >
    </div>
    <div class="donate__image" />
  </div>
</template>

<script>
import { donateUrl } from "@/utils/config";
export default {
  methods: {
    goToDonatePage() {
      window.open(donateUrl);
    }
  }
};
</script>

<style lang="scss" scoped>
.donate {
  max-width: 1535px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(100vh - #{$header-height});

  @media screen and (max-width: 1600px) {
    justify-content: center;
  }

  @media screen and (max-width: 768px) {
    padding: 0 20px 20px;
  }

  &__description {
    max-width: 821px;
  }

  &__title {
    margin-bottom: 50px;
    @include fontRubik(32px, $white-color2);
    line-height: 34px;

    @media screen and (max-width: 768px) {
      font-size: 22px;
      line-height: initial;
    }
  }

  &__paragraph {
    @include fontRubik(28px, $white-color2, 300);
    line-height: 25px;
    margin-bottom: 25px;

    @media screen and (max-width: 768px) {
      font-size: 20px;
      line-height: initial;
    }
  }

  &__btn {
    margin-top: 66px;

    @media screen and (max-width: 768px) {
      margin-top: 25px;
      font-size: 27px;
      padding: 24px;
    }
  }

  &__image {
    @include attachImage("donate", 602px, 551px);
    margin-top: 27px;
    margin-right: -9px;

    @media screen and (max-width: 1600px) {
      display: none;
    }
  }
}
</style>
