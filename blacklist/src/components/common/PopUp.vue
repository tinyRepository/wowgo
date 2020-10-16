<template>
  <transition name="fade" mode="out-in">
    <div class="popup">
      <div class="popup__overlay" @click="$emit('close')" />
      <div class="popup__content">
        <div class="popup__header">Добавить нового человека в список</div>
        <div class="popup__body">
          <form
            novalidate
            @submit.stop.prevent="tryToSendForm"
            class="popup__form"
          >
            <div class="popup__form-row">
              <input-el
                class="popup__form-input"
                type="text"
                name="surname"
                v-model="form.surname"
                inputId="surname"
                whiteLabel
                placeholder="Введите фамилию"
                label="Фамилия"
              />
              <input-el
                class="popup__form-input"
                type="text"
                name="name"
                v-model="form.name"
                inputId="name"
                whiteLabel
                placeholder="Введите имя"
                label="Имя"
              />
              <input-el
                class="popup__form-input"
                type="text"
                name="middleName"
                v-model="form.middleName"
                inputId="middleName"
                whiteLabel
                placeholder="Введите отчество"
                label="Отчество"
              />
            </div>
            <div class="popup__form-row">
              <input-el
                class="popup__form-input"
                type="text"
                name="placeOfBirth"
                v-model="form.placeOfBirth"
                inputId="placeOfBirth"
                whiteLabel
                placeholder="Введите место рождения"
                label="Место рождения"
              />
              <select-box
                whiteLabel
                label="Выбирете категорию нарушения"
                v-model="form.categoriesOfViolations"
                :options="selectboxOptions"
              ></select-box>
              <input-el
                class="popup__form-input"
                type="text"
                name="dateOfBirth"
                mask="99/99/9999"
                v-model="form.dateOfBirth"
                inputId="dateOfBirth"
                whiteLabel
                placeholder="Введите дату рождения"
                label="Дата рождения"
              />
            </div>

            <textarea-el
              whiteLabel
              v-model="form.reasonForAdding"
              label="Причина внесения в список человека"
              class="popup__form-textarea"
              placeholder="Опишите подробно причину почему Вы хотите
            добавить человека в список, чтобы вашим колегам было понятно как
            действовать с данным гостем."
            />
          </form>
        </div>
        <div class="popup__footer">
          <button-el gray class="popup__footer-button" @click="$emit('close')">
            Отменить
          </button-el>
          <button-el class="popup__footer-button" @click="addItem">
            Сохранить
          </button-el>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { format } from "date-fns";
import { dateFormat } from "@/utils/config";

export default {
  data: () => ({
    form: {
      name: "",
      surname: "",
      middleName: "",
      dateOfBirth: "",
      placeOfBirth: "",
      reasonForAdding: "",
      categoriesOfViolations: null
    },
    selectboxOptions: [
      { value: "Воровство", id: "theft" },
      { value: "Оскорбление граждан", id: "insultingCitizens" },
      { value: "Порча имущества", id: "destructionOfProperty" },
      { value: "Курение", id: "smoking" },
      { value: "Распитие алкоголя", id: "drinkingAlcohol" },
      { value: "Потребление наркотических веществ", id: "consumptionOfDrugs" },
      { value: "Убийство", id: "murder" },
      { value: "Неоплата услуг", id: "NonPaymentOfServices" }
    ]
  }),
  computed: {
    ...mapState("userData", ["userInfo"]),
    dataForSending() {
      return {
        name: this.form.name,
        fullName: this.fullName,
        surname: this.form.surname,
        phone: this.userInfo.phone,
        address: this.userInfo.address,
        middleName: this.form.middleName,
        dateOfBirth: this.form.dateOfBirth,
        placeOfBirth: this.form.placeOfBirth,
        nameOfHotel: this.userInfo.nameOfObject,
        dateAdded: format(new Date(), dateFormat),
        reasonForAdding: this.form.reasonForAdding,
        categoriesOfViolations: this.form.categoriesOfViolations.value
      };
    },
    fullName() {
      const { name, surname, middleName } = this.form;
      return `${surname} ${name} ${middleName}`;
    }
  },
  methods: {
    ...mapActions("blackList", ["addItemToList"]),
    addItem() {
      this.addItemToList(this.dataForSending).finally(() => {
        this.$emit("close");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: $white-color3;
  display: flex;
  align-items: center;
  justify-content: center;
  &__content {
    width: 100%;
    height: 100%;
    max-width: 1151px;
    max-height: 821px;
    border-radius: 5px;
    overflow-y: auto;
    background: $black-color2;
    position: relative;
    top: 10px;
    padding: 35px 0;
    box-shadow: 0px 28px 28px rgba(50, 50, 71, 0.15),
      0px 48px 56px rgba(50, 50, 71, 0.25);
  }
  &__overlay {
    width: 100%;
    position: absolute;
    height: 100%;
  }
  &__header {
    @include fontRubik(20px, $white-color1);
    line-height: 16px;
    padding: 0 70px;
    border-bottom: 2px solid $gray-color8;
    padding-bottom: 27px;
  }
  &__body {
    padding: 65px 70px;
  }
  &__footer {
    padding: 0 70px;
    margin-left: auto;
    margin-top: -15px;
    display: table;
  }
  &__footer-button {
    height: 46px;
    &:nth-child(2) {
      margin-left: 15px;
    }
  }
  &__form-textarea {
    height: 148px;
  }
  &__form-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-column-gap: 8px;
    padding-bottom: 50px;
    margin-bottom: 85px;
    border-bottom: 2px solid $gray-color8;
  }
}
</style>
