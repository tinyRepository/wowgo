<template>
  <div class="form">
    <label
      :for="inputId"
      class="form__label"
      :class="{ form__label_white: whiteLabel }"
    >
      {{ label }}
    </label>
    <input
      :id="inputId"
      v-mask="mask"
      :class="{ 'is-danger': showError }"
      class="form__input"
      :value="value"
      @input="onInput"
      @blur="onBlur"
      @focus="$emit('focus', $event)"
      @keypress="$emit('keypress', $event)"
      @paste="$emit('paste', $event)"
      v-bind="$attrs"
    />
    <span v-show="showError" class="error-text">{{ errorText }}</span>
  </div>
</template>

<script>
import Vue from "vue";
const VueInputMask = require("vue-inputmask").default;
Vue.use(VueInputMask);

const errorsTexts = {
  required: "Заполните поле",
  email: "Неверный формат",
  sameAs: "Пароли не совпадают",
  phoneIsFilled: "Заполните телефон",
  dateIsFilled: "Заполните дату",
  minLength: `Пароль должен быть не менее ${passwordMinLength} символов`
};

import { passwordMinLength } from "@/utils/config";

export default {
  inheritAttrs: false,

  props: {
    customErrorsTexts: {
      type: Object,
      default: () => ({})
    },

    validationObj: Object,
    mask: String,
    value: [String, Number],
    inputId: String,
    error: Boolean,
    label: String,
    whiteLabel: Boolean
  },

  data() {
    return {
      userIsTyping: false
    };
  },

  computed: {
    errorText() {
      if (!this.validationObj) {
        return null;
      }
      const keys = Object.keys(this.validationObj.$params);
      const invalidKey = keys.find(key => !this.validationObj[key]);
      if (!invalidKey) {
        return null;
      }
      return (
        this.customErrorsTexts[invalidKey] ||
        errorsTexts[invalidKey] ||
        "Ошибка!"
      );
    },

    showError() {
      return !this.userIsTyping && this.errorText && this.validationObj.$dirty;
    }
  },

  methods: {
    onBlur(e) {
      this.$emit("blur", e);
      this.userIsTyping = false;
    },

    onInput(e) {
      this.$emit("input", e.target.value);
      this.userIsTyping = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  &__input {
    @include fontRubik(13px, $black-color1, 300);
    line-height: 18px;
    border-radius: 5px;
    width: 100%;
    padding: 15px 19px;
    border: 1px solid $gray-color3;
    -moz-appearance: textfield;
    outline: none;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }

  &__label {
    @include fontSans(15px, $black-color2, bold);
    line-height: 20px;
    letter-spacing: -0.4px;
    position: absolute;
    left: 0px;
    top: -35px;
    &_white {
      color: $white-color1;
    }
  }
}
.is-danger {
  border: 1px solid $red-color1;
}
.error-text {
  @include fontRubik(12px, $red-color1, 300);
  position: absolute;
  left: 0;
  right: 0;
  bottom: -21px;
}
</style>
