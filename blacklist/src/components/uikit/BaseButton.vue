<template>
  <button
    class="btn"
    :class="{ btn_gray: gray, btn_red: red }"
    :disabled="disabled"
    v-on="$listeners"
    :type="type"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean
    },

    type: {
      type: String,
      default: "button"
    },

    gray: {
      type: Boolean
    },

    red: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  @include removeBtnDefaults;
  @include fontRubik(12px, $black-color2, 500);
  background: $brown-color1;
  box-shadow: 0px 4px 4px rgba(50, 50, 71, 0.08),
    0px 4px 8px rgba(50, 50, 71, 0.06);
  border-radius: 5px;
  padding: 12px 20px;
  line-height: 16px;
  text-align: center;
  &_gray {
    background: $gray-color7;
    color: $white-color1;
  }
  &_red {
    border-radius: 5px;
    @include fontRubik(32px, $white-color1, 300);
    padding: 30px;
    background: $red-color2;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(50, 50, 71, 0.08),
      0px 4px 8px rgba(50, 50, 71, 0.06);
  }
  &[disabled] {
    cursor: not-allowed;
  }
}
</style>
