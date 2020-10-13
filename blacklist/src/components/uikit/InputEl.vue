<template>
  <div class="form">
    <label :for="inputId" class="form__label">
      {{ label }}
    </label>
    <input
      :class="{ 'is-danger': error }"
      :id="inputId"
      class="form__input"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @keypress="$emit('keypress', $event)"
      @paste="$emit('paste', $event)"
      v-bind="$attrs"
    />
    <!-- TODO: show custom errors -->
    <span v-show="error" class="error-text">Ошибка!</span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: [String, Number],
    inputId: String,
    error: Boolean,
    label: String
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
    &::placeholder {
      // color: $grey-color1;
    }
    &:-webkit-autofill {
      // -webkit-box-shadow: 0 0 0 30px $grey-color6 inset !important;
      // border-color: $grey-color6 !important;
    }
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
  }
}
</style>
