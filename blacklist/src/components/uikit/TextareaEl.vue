<template>
  <div class="form">
    <label
      :for="textareaId"
      class="textarea__label"
      :class="{ textarea__label_white: whiteLabel }"
      >{{ label }}</label
    >
    <textarea
      :id="textareaId"
      ref="textarea"
      :name="name"
      class="textarea"
      :class="{ 'is-danger': showError }"
      :placeholder="placeholder"
      :value="value"
      @input="onInput"
      @blur="onBlur"
    >
    </textarea>
    <span v-show="showError" class="error-text">{{ errorText }}</span>
  </div>
</template>

<script>
const errorsTexts = {
  required: "Заполните поле"
};

export default {
  inheritAttrs: false,

  props: {
    validationObj: Object,

    customErrorsTexts: {
      type: Object,
      default: () => ({})
    },

    name: String,
    placeholder: String,
    value: [String, Number],
    textareaId: String,
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

  watch: {
    value: {
      handler() {
        this.$nextTick(() => {
          this.updateTextareaState();
        });
      },
      immediate: true
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
    },

    updateTextareaState() {
      this.resetTextareaSize();
      this.textareaResize();
    },

    textareaResize() {
      this.$refs.textarea.style.minHeight = `${this.$refs.textarea.scrollHeight}px`;
    },

    resetTextareaSize() {
      this.$refs.textarea.style.minHeight = "0px";
    }
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
  overflow-y: hidden;
  -moz-appearance: textfield;
  outline: none;
  resize: none;
  white-space: normal;

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
