<template>
  <div class="form">
    <label
      :for="textareaId"
      class="textarea__label"
      :class="{ textarea__label_white: whiteLabel }"
      >{{ label }}</label
    >
    <textarea
      :name="name"
      class="textarea"
      :id="textareaId"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    </textarea>
    <span v-show="error" class="error-text">Ошибка!</span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    name: String,
    placeholder: String,
    value: [String, Number],
    textareaId: String,
    error: Boolean,
    label: String,
    whiteLabel: Boolean
  }
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  width: 100%;
}
.textarea {
  @include fontRubik(13px, $black-color1, 300);
  line-height: 18px;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  padding: 15px 19px;
  border: 1px solid $gray-color3;
  -moz-appearance: textfield;
  outline: none;
  resize: none;
  white-space: normal;
  &::placeholder {
    // color: $grey-color1;
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
</style>
