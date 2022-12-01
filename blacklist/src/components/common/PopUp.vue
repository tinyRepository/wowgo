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
              <base-input
                v-model="$v.form.surname.$model"
                :validationObj="$v.form.surname"
                class="popup__form-input"
                type="text"
                name="surname"
                inputId="surname"
                whiteLabel
                placeholder="Введите фамилию"
                label="Фамилия"
              />
              <base-input
                v-model="$v.form.name.$model"
                :validationObj="$v.form.name"
                class="popup__form-input"
                type="text"
                name="name"
                inputId="name"
                whiteLabel
                placeholder="Введите имя"
                label="Имя"
              />
              <base-input
                v-model="$v.form.middleName.$model"
                :validationObj="$v.form.middleName"
                class="popup__form-input"
                type="text"
                name="middleName"
                inputId="middleName"
                whiteLabel
                placeholder="Введите отчество"
                label="Отчество"
              />
            </div>
            <div class="popup__form-row">
              <base-input
                v-model="$v.form.placeOfBirth.$model"
                :validationObj="$v.form.placeOfBirth"
                class="popup__form-input"
                type="text"
                name="placeOfBirth"
                inputId="placeOfBirth"
                whiteLabel
                placeholder="Введите место рождения"
                label="Место рождения"
              />
              <select-box
                v-model="$v.form.categoriesOfViolations.$model"
                :validationObj="$v.form.categoriesOfViolations"
                whiteLabel
                label="Выбирете категорию нарушения"
                :options="selectboxOptions"
              />
              <base-input
                v-model="$v.form.dateOfBirth.$model"
                :validationObj="$v.form.dateOfBirth"
                class="popup__form-input"
                type="text"
                name="dateOfBirth"
                mask="99/99/9999"
                inputId="dateOfBirth"
                whiteLabel
                placeholder="Введите дату рождения"
                label="Дата рождения"
              />
            </div>

            <textarea-el
              v-model.trim="$v.form.reasonForAdding.$model"
              :validationObj="$v.form.reasonForAdding"
              whiteLabel
              label="Причина внесения в список человека"
              class="popup__form-textarea"
              placeholder="Опишите подробно причину почему Вы хотите
            добавить человека в список, чтобы вашим колегам было понятно как
            действовать с данным гостем."
            />
          </form>
        </div>
        <div class="popup__footer">
          <base-button
            gray
            class="popup__footer-button"
            @click="$emit('close')"
          >
            Отменить
          </base-button>
          <base-button class="popup__footer-button" @click="tryToSendForm">
            Сохранить
          </base-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import validateFormMixin from "@/mixins/validateForm";
import { required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
import { format } from "date-fns";
import { dateFormat } from "@/utils/config";

const dateIsFilled = val => !val.includes("_");

export default {
  mixins: [validateFormMixin],

  data() {
    return {
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
        { value: "Кража", id: "theft" },
        { value: "Оскорбление", id: "insultingCitizens" },
        { value: "Порча имущества", id: "destructionOfProperty" },
        { value: "Курение", id: "smoking" },
        { value: "Распитие алкоголя", id: "drinkingAlcohol" },
        {
          value: "Потребление наркотических веществ",
          id: "consumptionOfDrugs"
        },
        { value: "Разбой", id: "murder" },
        { value: "Неоплата услуг", id: "nonPaymentOfServices" },
        { value: "Другое", id: "other" }
      ]
    };
  },

  computed: {
    ...mapState("userData", ["userInfo"]),
    dataForSending() {
      const { name, surname, middleName } = this.form;
      return {
        fullName: this.fullName,
        phone: this.userInfo.phone,
        address: this.userInfo.address,
        dateOfBirth: this.form.dateOfBirth,
        placeOfBirth: this.form.placeOfBirth,
        nameOfHotel: this.userInfo.nameOfObject,
        dateAdded: format(new Date(), dateFormat),
        reasonForAdding: this.form.reasonForAdding,
        name: name[0].toUpperCase() + name.slice(1).toLowerCase(),
        categoriesOfViolations: this.form.categoriesOfViolations.value,
        surname: surname[0].toUpperCase() + surname.slice(1).toLowerCase(),
        middleName:
          middleName[0].toUpperCase() + middleName.slice(1).toLowerCase()
      };
    },

    fullName() {
      const { name, surname, middleName } = this.form;
      return `${surname[0].toUpperCase() +
        surname.slice(1).toLowerCase()} ${name[0].toUpperCase() +
        name.slice(1).toLowerCase()} ${middleName[0].toUpperCase() +
        middleName.slice(1).toLowerCase()}`;
    }
  },

  methods: {
    ...mapActions("blackList", ["addItemToList"]),
    addItem() {
      this.addItemToList(this.dataForSending)
        .then(() => {
          if (localStorage.getItem("hidePopup")) {
            alert("Успешно добавлен!");
          } else {
            this.$emit("showSuccessPopup");
          }
        })
        .finally(() => {
          this.$emit("close");
        });
    },

    tryToSendForm() {
      this.validateForm().then(() => {
        this.addItem();
      });
    }
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
      dateOfBirth: {
        required,
        dateIsFilled
      },
      placeOfBirth: {
        required
      },
      reasonForAdding: {
        required
      },
      categoriesOfViolations: {
        required
      }
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
  @media screen and (max-width: 768px) {
    align-items: baseline;
  }
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
    @media screen and (max-width: 768px) {
      top: 0;
      max-height: 100%;
    }
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
    @media screen and (max-width: 768px) {
      padding: 0 10px 20px;
      text-align: center;
      font-size: 16px;
    }
  }
  &__body {
    padding: 65px 70px;
    @media screen and (max-width: 768px) {
      padding: 65px 10px;
    }
  }
  &__footer {
    padding: 0 70px;
    margin-left: auto;
    margin-top: -15px;
    display: table;
    @media screen and (max-width: 768px) {
      padding: 0 10px;
      margin: -15px auto 0;
    }
  }
  &__footer-button {
    height: 46px;
    &:nth-child(2) {
      margin-left: 15px;
    }
  }
  &__form-textarea {
    ::v-deep .textarea {
      height: 148px;
    }
  }
  &__form-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-column-gap: 8px;
    padding-bottom: 50px;
    margin-bottom: 85px;
    border-bottom: 2px solid $gray-color8;
    @media screen and (max-width: 768px) {
      grid-template-columns: auto;
      grid-row-gap: 60px;
      grid-template-rows: repeat(3, 1fr);
    }
  }
}
</style>
