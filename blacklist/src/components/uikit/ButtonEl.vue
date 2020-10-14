<template>
  <button class="btn" :disabled="disabled" v-on="$listeners" :type="type">
    <slot></slot>
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

  &[disabled] {
    cursor: not-allowed;
  }
}
</style>
